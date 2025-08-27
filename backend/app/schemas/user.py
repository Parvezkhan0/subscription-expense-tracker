from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class Token(BaseModel):
    access_token: str
    token_type: str


class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None


class UserCreate(UserBase):
    password: str
    name: Optional[str] = Field(None, alias="name")  # Frontend sends "name"
    
    def __init__(self, **data):
        # Handle both "name" and "full_name" fields
        if "name" in data and "full_name" not in data:
            data["full_name"] = data["name"]
        super().__init__(**data)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        orm_mode = True


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    name: Optional[str] = None

    class Config:
        orm_mode = True
