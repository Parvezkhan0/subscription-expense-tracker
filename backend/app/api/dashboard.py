# app/api/dashboard.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.dashboard_service import DashboardService
from app.services.user_service import UserService
from app.schemas.user import UserResponse

router = APIRouter(
    tags=["Dashboard"]
)

@router.get("/", summary="Get dashboard data", response_model=dict)
def dashboard(db: Session = Depends(get_db)):
    """
    Endpoint to fetch dashboard data.
    """
    return DashboardService.get_dashboard_summary(db, 1)  # Temporary: use user_id 1

@router.get("/summary", summary="Get dashboard summary", response_model=dict)
def dashboard_summary(db: Session = Depends(get_db)):
    """
    Endpoint to fetch dashboard summary data.
    """
    return DashboardService.get_dashboard_summary(db, 1)  # Temporary: use user_id 1
