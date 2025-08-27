from pydantic import BaseModel
from typing import Optional
from datetime import date


class ExpenseBase(BaseModel):
    title: str
    amount: float
    date: date
    category: str
    description: Optional[str] = None


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[float] = None
    date: Optional[date] = None
    category: Optional[str] = None
    description: Optional[str] = None


class ExpenseOut(ExpenseBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
