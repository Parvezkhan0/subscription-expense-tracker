from sqlalchemy.orm import Session
from app.db.models.subscription import Subscription
from app.schemas.subscription import SubscriptionCreate, SubscriptionUpdate


class SubscriptionService:
    @staticmethod
    def create(db: Session, subscription: SubscriptionCreate, user_id: int):
        db_subscription = Subscription(**subscription.dict(), user_id=user_id)
        db.add(db_subscription)
        db.commit()
        db.refresh(db_subscription)
        return db_subscription

    @staticmethod
    def get_user_subscriptions(db: Session, user_id: int):
        return db.query(Subscription).filter(Subscription.user_id == user_id).all()

    @staticmethod
    def get_by_id(db: Session, subscription_id: int, user_id: int):
        return db.query(Subscription).filter(
            Subscription.id == subscription_id,
            Subscription.user_id == user_id
        ).first()

    @staticmethod
    def update(db: Session, subscription_id: int, updates: SubscriptionCreate, user_id: int):
        db_subscription = db.query(Subscription).filter(
            Subscription.id == subscription_id,
            Subscription.user_id == user_id
        ).first()
        
        if not db_subscription:
            return None
            
        for key, value in updates.dict().items():
            setattr(db_subscription, key, value)
        
        db.commit()
        db.refresh(db_subscription)
        return db_subscription

    @staticmethod
    def delete(db: Session, subscription_id: int, user_id: int):
        db_subscription = db.query(Subscription).filter(
            Subscription.id == subscription_id,
            Subscription.user_id == user_id
        ).first()
        
        if not db_subscription:
            return False
            
        db.delete(db_subscription)
        db.commit()
        return True
