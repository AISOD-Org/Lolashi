import logging
from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
import stripe
import os

from core.database import get_db
from models.orders import Orders
from core.config import settings

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY", "")

router = APIRouter(prefix="/api/v1/payment", tags=["payment"])

BOOK_PRICE = 2000  # $20.00 in cents
BOOK_NAME = "Illuminati One World Government Agenda Will Fail"


class CheckoutSessionRequest(BaseModel):
    customer_name: str
    customer_email: str
    customer_phone: str = ""
    delivery_address: str
    quantity: int = 1


class CheckoutSessionResponse(BaseModel):
    session_id: str
    url: str
    order_id: int


class PaymentVerificationRequest(BaseModel):
    session_id: str


class PaymentStatusResponse(BaseModel):
    status: str
    order_id: int = None
    payment_status: str


@router.post("/create_payment_session", response_model=CheckoutSessionResponse)
async def create_payment_session(
    data: CheckoutSessionRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    """Create a Stripe checkout session for book purchase"""
    try:
        frontend_host = request.headers.get("App-Host", "")
        if frontend_host and not frontend_host.startswith(("http://", "https://")):
            frontend_host = f"https://{frontend_host}"

        total_amount = BOOK_PRICE * data.quantity

        # Create order in database
        order = Orders(
            customer_name=data.customer_name,
            customer_email=data.customer_email,
            customer_phone=data.customer_phone,
            delivery_address=data.delivery_address,
            quantity=data.quantity,
            total_amount=total_amount / 100,
            status="pending",
        )
        db.add(order)
        await db.commit()
        await db.refresh(order)

        # Close transaction before slow Stripe call
        order_id = order.id
        await db.rollback()

        # Create Stripe checkout session
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            "name": BOOK_NAME,
                            "description": f"By Sam Tiliindje | ISBN: 978-99945-59-97-8 | {data.quantity}x copy",
                        },
                        "unit_amount": BOOK_PRICE,
                    },
                    "quantity": data.quantity,
                }
            ],
            mode="payment",
            success_url=f"{frontend_host}/payment-success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{frontend_host}/order",
            customer_email=data.customer_email,
            metadata={
                "order_id": str(order_id),
                "customer_name": data.customer_name,
            },
        )

        # Update order with session_id
        from sqlalchemy import select
        result = await db.execute(select(Orders).where(Orders.id == order_id))
        order_obj = result.scalar_one_or_none()
        if order_obj:
            order_obj.stripe_session_id = session.id
            await db.commit()

        return CheckoutSessionResponse(
            session_id=session.id,
            url=session.url,
            order_id=order_id,
        )
    except Exception as e:
        logging.error(f"Payment session creation error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create payment session: {str(e)}")


@router.post("/verify_payment", response_model=PaymentStatusResponse)
async def verify_payment(
    data: PaymentVerificationRequest,
    db: AsyncSession = Depends(get_db),
):
    """Verify payment status and update order"""
    try:
        session = stripe.checkout.Session.retrieve(data.session_id)
        order_id = int(session.metadata.get("order_id", 0))

        status_mapping = {"complete": "paid", "open": "pending", "expired": "cancelled"}
        payment_status = status_mapping.get(session.status, "pending")

        # Update order status if payment complete
        if payment_status == "paid":
            from sqlalchemy import select
            result = await db.execute(select(Orders).where(Orders.id == order_id))
            order_obj = result.scalar_one_or_none()
            if order_obj and order_obj.status != "paid":
                order_obj.status = "paid"
                await db.commit()

                # Send email notification after committing
                await db.rollback()
                try:
                    from services.email_notifications import send_order_confirmation_email
                    await send_order_confirmation_email(
                        customer_name=order_obj.customer_name,
                        customer_email=order_obj.customer_email,
                        order_id=order_obj.id,
                        quantity=order_obj.quantity,
                        total=order_obj.total_amount,
                    )
                except Exception as email_err:
                    logging.warning(f"Email notification failed: {email_err}")

        return PaymentStatusResponse(
            status=payment_status,
            order_id=order_id,
            payment_status=session.payment_status,
        )
    except Exception as e:
        logging.error(f"Payment verification error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to verify payment: {str(e)}")