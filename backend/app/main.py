from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, subscriptions, expenses, dashboard, notifications
from app.core.config import settings
from app.worker import celery_app

app = FastAPI(title="SubTrack API", version="1.0.0")

# CORS - Updated to specifically allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(subscriptions.router, prefix="/subscriptions", tags=["Subscriptions"])
app.include_router(expenses.router, prefix="/expenses", tags=["Expenses"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])

@app.get("/")
def root():
    return {"message": "SubTrack API is running."}

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "SubTrack API is running"}
