# app/api/subscription.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.schemas.subscription import SubscriptionCreate, SubscriptionOut
from app.services.subscription_service import SubscriptionService
from app.services.user_service import UserService
from app.schemas.user import UserResponse

router = APIRouter(
    tags=["Subscriptions"]
)

@router.get("/", response_model=List[SubscriptionOut], summary="Get all subscriptions")
def get_subscriptions(
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(UserService.get_current_user)
):
    """
    Get all subscriptions for the current user.
    """
    try:
        return SubscriptionService.get_user_subscriptions(db, current_user.id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{subscription_id}", response_model=SubscriptionOut, summary="Get a specific subscription")
def get_subscription(
    subscription_id: int,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(UserService.get_current_user)
):
    """
    Get a specific subscription by ID.
    """
    try:
        subscription = SubscriptionService.get_by_id(db, subscription_id, current_user.id)
        if not subscription:
            raise HTTPException(status_code=404, detail="Subscription not found")
        return subscription
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/", response_model=SubscriptionOut, summary="Create a new subscription")
def create_subscription(
    data: SubscriptionCreate, 
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(UserService.get_current_user)
):
    """
    Create a new subscription entry in the database.
    """
    try:
        return SubscriptionService.create(db, data, current_user.id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{subscription_id}", response_model=SubscriptionOut, summary="Update a subscription")
def update_subscription(
    subscription_id: int,
    data: SubscriptionCreate,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(UserService.get_current_user)
):
    """
    Update a subscription.
    """
    try:
        subscription = SubscriptionService.update(db, subscription_id, data, current_user.id)
        if not subscription:
            raise HTTPException(status_code=404, detail="Subscription not found")
        return subscription
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{subscription_id}", summary="Delete a subscription")
def delete_subscription(
    subscription_id: int,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(UserService.get_current_user)
):
    """
    Delete a subscription.
    """
    try:
        success = SubscriptionService.delete(db, subscription_id, current_user.id)
        if not success:
            raise HTTPException(status_code=404, detail="Subscription not found")
        return {"message": "Subscription deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
