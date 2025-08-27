# 🔗 Backend Integration Guide

## 📋 Prerequisites

1. **Backend Repository**: [SubTrack-Backend](https://github.com/DivyaBGowda484/SubTrack-Backend.git) should be running on `http://localhost:8000`
2. **Database**: PostgreSQL should be running and accessible
3. **Redis**: For caching and Celery tasks

## 🚀 Quick Setup

### 1. Environment Variables

Create a `.env` file in the `subtrack-frontend/` directory:

```bash
# Backend API Configuration
VITE_API_URL=http://localhost:8000

# Development Settings
VITE_DEV_MODE=true
VITE_ENABLE_MOCK_API=false
```

### 2. Backend Setup

Based on the [SubTrack-Backend repository](https://github.com/DivyaBGowda484/SubTrack-Backend.git):

```bash
# Clone the backend repository
git clone https://github.com/DivyaBGowda484/SubTrack-Backend.git
cd SubTrack-Backend

# Run via Docker (recommended)
docker-compose up --build

# Or run directly with Python
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Backend API Endpoints

Based on the backend repository structure, your backend should provide these endpoints:

#### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

#### Subscriptions
- `GET /subscriptions/` - List all subscriptions
- `POST /subscriptions/` - Create new subscription
- `PUT /subscriptions/{id}` - Update subscription
- `DELETE /subscriptions/{id}` - Delete subscription

#### Expenses
- `GET /expenses/` - List all expenses
- `POST /expenses/` - Create new expense
- `PUT /expenses/{id}` - Update expense
- `DELETE /expenses/{id}` - Delete expense

#### Dashboard
- `GET /dashboard/summary` - Dashboard summary
- `GET /dashboard/analytics` - Analytics data

#### Health Check
- `GET /health` - Backend health status

## 🔧 Development Workflow

### 1. Start Backend
```bash
# In your backend repository
cd SubTrack-Backend
docker-compose up --build
```

### 2. Start Frontend
```bash
# In this repository
npm run dev
```

### 3. Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Backend Docs: http://localhost:8000/docs
- Backend Health: http://localhost:8000/health

## 🧪 Testing Integration

### 1. Health Check
```bash
curl http://localhost:8000/health
```

### 2. Test Authentication
```bash
# Register a user
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🔒 CORS Configuration

Ensure your backend has CORS configured for the frontend. Add this to your FastAPI backend:

```python
# In your FastAPI backend (app/main.py)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📊 API Response Format

Your backend should return responses in this format:

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

For errors:
```json
{
  "detail": "Error message"
}
```

## 🚀 Production Deployment

### 1. Build Frontend
```bash
npm run build
```

### 2. Serve Static Files
The built files will be in `dist/` directory. Serve them with your backend or a web server.

### 3. Environment Variables
Update `VITE_API_URL` to point to your production backend URL.

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Errors**: Check backend CORS configuration
2. **Connection Refused**: Ensure backend is running on correct port
3. **Authentication Issues**: Verify JWT token format and expiration
4. **API Endpoint Mismatch**: Check endpoint URLs match between frontend and backend

### Debug Commands:
```bash
# Check if backend is running
curl http://localhost:8000/health

# Check frontend API calls
# Open browser DevTools → Network tab

# Check environment variables
echo $VITE_API_URL
```

### Backend Status Indicator

The frontend now includes a backend status indicator in the top-right corner that shows:
- ✅ Backend Connected (green)
- ❌ Backend Disconnected (red)
- ⚠️ Backend Error (yellow)
- ⏳ Checking Backend... (loading)

## 📚 Additional Resources

- [SubTrack-Backend Repository](https://github.com/DivyaBGowda484/SubTrack-Backend.git)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)
- [Vite Documentation](https://vitejs.dev/) 