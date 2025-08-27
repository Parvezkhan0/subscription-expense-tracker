# 📊 SubTrack Project Overview

## 🏗️ Architecture Overview

SubTrack is a full-stack subscription and expense tracking application with the following architecture:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Infrastructure│
│   (React/Vite)  │◄──►│   (FastAPI)     │◄──►│   (Docker/K8s)  │
│   Port: 5173    │    │   Port: 8000    │    │   PostgreSQL    │
└─────────────────┘    └─────────────────┘    │   Redis         │
                                              └─────────────────┘
```

## 📁 Repository Structure

### This Repository (Frontend)
```
SubTrack-Frontend/
├── 📄 package.json              # Dependencies & scripts
├── ⚙️ vite.config.js            # Vite configuration
├── 🎨 tailwind.config.js        # Tailwind CSS config
├── 📝 README.md                 # Project documentation
├── 🔗 BACKEND_INTEGRATION.md    # Backend integration guide
├── 📊 PROJECT_OVERVIEW.md       # This file
└── 📂 subtrack-frontend/        # Main source code
    ├── 📄 index.html            # Entry HTML file
    └── 📂 src/
        ├── 🚀 main.jsx          # React entry point
        ├── 🏠 App.jsx           # Main app component
        ├── 🎨 index.css         # Global styles
        ├── 🔐 context/          # React contexts
        ├── 🔧 services/         # API services
        ├── 🧩 components/       # Reusable components
        ├── 📄 pages/            # Page components
        └── 🛣️ routes/           # Routing components
```

### Your Backend Repository
```
SubTrack-Backend/
├── 🐍 main.py                   # FastAPI application
├── 📊 models/                   # Database models
├── 🔐 auth/                     # Authentication logic
├── 📡 api/                      # API endpoints
├── 🗄️ database/                 # Database configuration
├── 🐳 docker-compose.yml        # Docker services
└── 📝 README.md                 # Backend documentation
```

## 🚀 Technology Stack

### Frontend (This Repository)
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.2.8
- **Routing**: React Router DOM 6.23.0
- **Styling**: Tailwind CSS 3.4.3
- **HTTP Client**: Axios 1.6.8
- **State Management**: React Context API

### Backend (Your Repository)
- **Framework**: FastAPI
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy/Tortoise ORM
- **Authentication**: JWT
- **Caching**: Redis
- **Task Queue**: Celery
- **Containerization**: Docker

## 🔧 Development Setup

### 1. Frontend Setup (This Repository)
```bash
# Clone and setup
git clone <frontend-repo-url>
cd SubTrack-Frontend
npm install

# Start development server
npm run dev
```

### 2. Backend Setup (Your Repository)
```bash
# Clone and setup
git clone <backend-repo-url>
cd SubTrack-Backend

# Using Docker
docker-compose up --build

# Or using Python directly
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Environment Configuration
```bash
# Frontend (.env file in subtrack-frontend/)
VITE_API_URL=http://localhost:8000

# Backend (.env file in your backend repo)
DATABASE_URL=postgresql://user:password@localhost:5432/subtrack
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key
```

## 📡 API Integration Points

### Authentication Flow
1. User registers/logs in via frontend
2. Frontend sends credentials to `/api/auth/login`
3. Backend validates and returns JWT token
4. Frontend stores token in localStorage
5. All subsequent requests include token in Authorization header

### Data Flow
1. Frontend components fetch data from backend APIs
2. Backend processes requests and returns JSON responses
3. Frontend updates UI based on response data
4. Real-time updates via WebSocket (if implemented)

## 🎯 Key Features

### Frontend Features
- ✅ User authentication (login/register)
- ✅ Protected routes
- ✅ Responsive dashboard
- ✅ Subscription management
- ✅ Expense tracking
- ✅ User profile management
- ✅ Modern UI with Tailwind CSS

### Backend Features (Expected)
- ✅ User authentication & authorization
- ✅ Subscription CRUD operations
- ✅ Expense tracking
- ✅ Dashboard analytics
- ✅ Email notifications
- ✅ CSV import/export
- ✅ API documentation (Swagger)

## 🔄 Development Workflow

### 1. Feature Development
```bash
# Frontend changes
cd SubTrack-Frontend
npm run dev

# Backend changes
cd SubTrack-Backend
docker-compose up --build
```

### 2. Testing
```bash
# Frontend tests
npm run test

# Backend tests
pytest

# Integration tests
# Test API endpoints with frontend
```

### 3. Building for Production
```bash
# Frontend build
npm run build

# Backend deployment
docker-compose -f docker-compose.prod.yml up --build
```

## 🚀 Deployment Strategy

### Development
- Frontend: Vite dev server (localhost:5173)
- Backend: FastAPI dev server (localhost:8000)
- Database: Local PostgreSQL
- Cache: Local Redis

### Production
- Frontend: Static files served by Nginx
- Backend: FastAPI with Gunicorn
- Database: AWS RDS PostgreSQL
- Cache: AWS ElastiCache Redis
- Load Balancer: AWS ALB
- Container Orchestration: AWS ECS/Kubernetes

## 🔍 Monitoring & Debugging

### Frontend Debugging
- Browser DevTools
- React DevTools extension
- Vite HMR (Hot Module Replacement)
- Console logging

### Backend Debugging
- FastAPI automatic docs (localhost:8000/docs)
- Logging with Python logging
- Database query monitoring
- API response inspection

## 📚 Documentation

- **Frontend**: This repository's README.md
- **Backend**: Your backend repository's README.md
- **API**: FastAPI auto-generated docs
- **Integration**: BACKEND_INTEGRATION.md

## 🤝 Contributing

### Frontend Development
1. Create feature branch
2. Make changes in `subtrack-frontend/src/`
3. Test with backend integration
4. Submit pull request

### Backend Development
1. Create feature branch
2. Implement API endpoints
3. Update API documentation
4. Test with frontend integration
5. Submit pull request

## 🔗 Useful Links

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Backend Health**: http://localhost:8000/health

## 📞 Support

For issues related to:
- **Frontend**: Check this repository's issues
- **Backend**: Check your backend repository's issues
- **Integration**: Refer to BACKEND_INTEGRATION.md 