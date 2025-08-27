from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class NotificationBase(BaseModel):
    message: str
    is_read: Optional[bool] = False


class NotificationCreate(NotificationBase):
    user_id: int


class NotificationUpdate(BaseModel):
    is_read: Optional[bool] = True


class NotificationOut(NotificationBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        orm_mode = True
