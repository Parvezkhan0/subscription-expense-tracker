from pydantic import BaseModel
from typing import Optional
from datetime import date


class SubscriptionBase(BaseModel):
    name: str
    amount: float
    frequency: str  # e.g., Monthly, Yearly, Weekly, Daily
    next_payment_date: date
    status: str = "active"
    description: Optional[str] = None


class SubscriptionCreate(SubscriptionBase):
    pass


class SubscriptionUpdate(BaseModel):
    name: Optional[str] = None
    amount: Optional[float] = None
    frequency: Optional[str] = None
    next_payment_date: Optional[date] = None
    status: Optional[str] = None
    description: Optional[str] = None


class SubscriptionOut(SubscriptionBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
