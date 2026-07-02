import logging
import os
import httpx

logger = logging.getLogger(__name__)

BOOK_NAME = "Illuminati One World Government Agenda Will Fail"


async def send_order_confirmation_email(
    customer_name: str,
    customer_email: str,
    order_id: int,
    quantity: int,
    total: float,
):
    """Send order confirmation email using the aihub text generation for email content."""
    try:
        subject = f"Order Confirmation - #{order_id} - {BOOK_NAME}"

        html_body = f"""
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #FFFBF5; border: 1px solid #D4A843; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #B8860B, #D4A843); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Order Confirmed</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Thank you for your purchase</p>
            </div>
            <div style="padding: 30px;">
                <p style="color: #3D2B1F; font-size: 16px;">Dear {customer_name},</p>
                <p style="color: #5C4033; font-size: 15px; line-height: 1.6;">
                    Your order has been confirmed. Thank you for purchasing <strong>{BOOK_NAME}</strong> by Sam Tiliindje.
                </p>
                <div style="background: #FFF8E7; border-left: 4px solid #D4A843; padding: 16px; margin: 20px 0; border-radius: 4px;">
                    <p style="margin: 0 0 8px; color: #3D2B1F; font-weight: bold;">Order Details</p>
                    <p style="margin: 4px 0; color: #5C4033;">Order ID: <strong>#{order_id}</strong></p>
                    <p style="margin: 4px 0; color: #5C4033;">Quantity: <strong>{quantity}</strong></p>
                    <p style="margin: 4px 0; color: #5C4033;">Total: <strong>${total:.2f} USD</strong></p>
                </div>
                <p style="color: #5C4033; font-size: 15px; line-height: 1.6;">
                    You can track your order status anytime by visiting our website and using your email or order ID.
                </p>
                <p style="color: #5C4033; font-size: 15px; line-height: 1.6;">
                    May the Lord bless you abundantly as you read this book.
                </p>
                <p style="color: #3D2B1F; font-size: 15px; margin-top: 24px;">
                    With blessings,<br>
                    <strong>Sam Tiliindje</strong><br>
                    <span style="color: #8B7355; font-size: 13px;">Author & Servant of the Lord</span>
                </p>
            </div>
            <div style="background: #3D2B1F; padding: 16px; text-align: center;">
                <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0;">
                    Lolashi Publishing &bull; samtiliindje@gmail.com
                </p>
            </div>
        </div>
        """

        # Use SendGrid if API key is available, otherwise log
        sendgrid_key = os.environ.get("SENDGRID_API_KEY", "")
        if sendgrid_key:
            async with httpx.AsyncClient() as client:
                await client.post(
                    "https://api.sendgrid.com/v3/mail/send",
                    headers={
                        "Authorization": f"Bearer {sendgrid_key}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "personalizations": [{"to": [{"email": customer_email}]}],
                        "from": {"email": "samtiliindje@gmail.com", "name": "Sam Tiliindje - Lolashi"},
                        "subject": subject,
                        "content": [{"type": "text/html", "value": html_body}],
                    },
                )
            logger.info(f"Order confirmation email sent to {customer_email}")
        else:
            logger.info(f"Email notification logged for {customer_email} (SendGrid not configured)")

    except Exception as e:
        logger.warning(f"Failed to send email notification: {e}")