#!/bin/bash

# Wait for database to be ready
echo "Waiting for database to be ready..."
sleep 10

# Initialize database
echo "Initializing database..."
python -m app.init_db

# Start the application
echo "Starting SubTrack API..."
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload 