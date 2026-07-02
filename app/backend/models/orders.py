from core.database import Base
from datetime import datetime
from sqlalchemy import Column, DateTime, Float, Integer, String


class Orders(Base):
    __tablename__ = "orders"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, nullable=False)
    customer_name = Column(String(200), nullable=False)
    customer_email = Column(String(200), nullable=False)
    customer_phone = Column(String(50), nullable=True)
    delivery_address = Column(String(500), nullable=False)
    quantity = Column(Integer, nullable=False, default=1, server_default='1')
    total_amount = Column(Float, nullable=False)
    status = Column(String(50), nullable=True, default='pending', server_default='pending')
    stripe_session_id = Column(String(200), nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.now)
    updated_at = Column(DateTime(timezone=True), default=datetime.now, onupdate=datetime.now)