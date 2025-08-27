from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.db.models.user import User
from app.schemas.user import Token, UserCreate, UserResponse
from app.services.user_service import UserService
from app.services.token_service import create_access_token

router = APIRouter(tags=["Authentication"])

# Login Route
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = UserService.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.full_name or user.email
        },
        "token": access_token
    }

# Register Route (keeping both /register and /signup for compatibility)
@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter_by(email=user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    new_user = UserService.create_user(db, user_data)
    access_token = create_access_token(data={"sub": new_user.email})
    return {
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "name": new_user.full_name or new_user.email
        },
        "token": access_token
    }

# Signup Route (alias for register to match frontend)
@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    return register(user_data, db)

# Get current user
@router.get("/me", response_model=UserResponse)
def get_current_user(current_user: User = Depends(UserService.get_current_user)):
    return current_user
