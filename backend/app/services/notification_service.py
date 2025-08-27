from sqlalchemy.orm import Session
from app.db.models.notification import Notification

class NotificationService:
    @staticmethod
    def get_all(db: Session):
        return db.query(Notification).all()