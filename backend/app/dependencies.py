from app.db.session import SessionLocal

def get_db():
    # TODO: Implement actual DB session logic
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()