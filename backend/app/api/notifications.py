# app/api/notification.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.notification import NotificationCreate, NotificationOut
from app.services.notification_service import NotificationService

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)

@router.post("/", response_model=NotificationOut, summary="Create a new notification")
def create_notification(
    notification: NotificationCreate,
    db: Session = Depends(get_db)
):
    """
    Create a notification for a user or event.
    """
    return NotificationService.create_notification(db, notification)

@router.get("/user/{user_id}", response_model=list[NotificationOut], summary="Get all notifications for a user")
def get_user_notifications(
    user_id: int,
    db: Session = Depends(get_db)
):
    """
    Retrieve all notifications for a specific user.
    """
    return NotificationService.get_notifications_for_user(db, user_id)

@router.delete("/{notification_id}", summary="Delete a notification by ID")
def delete_notification(
    notification_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete a notification by its ID.
    """
    success = NotificationService.delete_notification(db, notification_id)
    if not success:
        raise HTTPException(status_code=404, detail="Notification not found")
    return {"message": "Notification deleted successfully"}
