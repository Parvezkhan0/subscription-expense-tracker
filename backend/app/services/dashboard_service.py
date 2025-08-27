from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from app.db.models.subscription import Subscription
from app.db.models.expense import Expense
from app.db.models.user import User

class DashboardService:
    @staticmethod
    def get_dashboard_summary(db: Session, user_id: int):
        """Get dashboard summary data for a user"""
        try:
            # Get total subscriptions
            total_subscriptions = db.query(Subscription).filter(
                Subscription.user_id == user_id,
                Subscription.status == 'active'
            ).count()
            
            # Get monthly spending (sum of all active subscriptions)
            monthly_spending = db.query(func.sum(Subscription.amount)).filter(
                Subscription.user_id == user_id,
                Subscription.status == 'active'
            ).scalar() or 0
            
            # Get upcoming renewals (subscriptions due in next 30 days)
            thirty_days_from_now = datetime.now() + timedelta(days=30)
            upcoming_renewals = db.query(Subscription).filter(
                Subscription.user_id == user_id,
                Subscription.status == 'active',
                Subscription.next_payment_date <= thirty_days_from_now
            ).count()
            
            return {
                "total_subscriptions": total_subscriptions,
                "monthly_spending": float(monthly_spending),
                "upcoming_renewals": upcoming_renewals
            }
        except Exception as e:
            print(f"Error getting dashboard summary: {e}")
            return {
                "total_subscriptions": 0,
                "monthly_spending": 0,
                "upcoming_renewals": 0
            }

def get_dashboard_data(db: Session, user_id: int = None):
    """Get dashboard data for the current user"""
    if user_id is None:
        # For now, return default data if no user_id provided
        return {
            "total_subscriptions": 0,
            "monthly_spending": 0,
            "upcoming_renewals": 0
        }
    
    return DashboardService.get_dashboard_summary(db, user_id)