# 🚀 SubTrack Backend Setup Guide

## Quick Start

### 1. Using Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/DivyaBGowda484/SubTrack-Backend.git
cd SubTrack-Backend

# Start all services
docker-compose up --build
```

### 2. Manual Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Set environment variables
export DATABASE_URL="postgresql://postgres:password@localhost:5432/subtrack"
export REDIS_URL="redis://localhost:6379"
export SECRET_KEY="your-secret-key-change-in-production"
export ACCESS_TOKEN_EXPIRE_MINUTES=30
export JWT_ALGORITHM=HS256

# Start PostgreSQL and Redis
# (Make sure you have PostgreSQL and Redis running)

# Initialize database
python -m app.init_db

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

### Health Check
- `GET /health` - API health status

### Subscriptions
- `GET /subscriptions/` - List subscriptions
- `POST /subscriptions/` - Create subscription

### Expenses
- `GET /expenses/` - List expenses
- `POST /expenses/` - Create expense

### Dashboard
- `GET /dashboard/summary` - Dashboard summary

## Access Points

- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/docs
- **Health**: http://localhost:8000/health

## Environment Variables

Create a `.env` file with:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/subtrack
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30
JWT_ALGORITHM=HS256
DEBUG=true
ENVIRONMENT=development
```

## Troubleshooting

1. **Database Connection Error**: Make sure PostgreSQL is running
2. **Redis Connection Error**: Make sure Redis is running
3. **Port Already in Use**: Change the port in docker-compose.yml
4. **Permission Denied**: Make sure start.sh is executable (`chmod +x start.sh`) 