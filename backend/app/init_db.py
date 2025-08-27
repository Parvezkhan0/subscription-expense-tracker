from sqlalchemy import create_engine
from app.db.base import Base
from app.db.session import DATABASE_URL

# Import all models to ensure they are registered with SQLAlchemy
from app.db.models import user, subscription, expense, notification

def init_db():
    """Initialize the database with tables"""
    engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")

if __name__ == "__main__":
    init_db() 