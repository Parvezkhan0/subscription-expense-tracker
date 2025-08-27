# 💰 Subscription Expense Tracker

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ed.svg)

**Take control of your recurring subscriptions and never miss a payment again!**

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-api-documentation) • [🤝 Contributing](#-contributing) • [⭐ Features](#-features)

---

</div>

## 🌟 Overview

**Subscription Expense Tracker** is a full-stack web application that helps you manage all your recurring subscriptions in one place. Built with modern technologies, it provides comprehensive expense tracking, intelligent reminders, and detailed analytics to optimize your subscription spending.

> 🎯 **Perfect for:** Individuals and families who want to take control of their subscription expenses and avoid unwanted charges.

## 📊 Problem & Solution

### 🚨 The Problem
- 💸 **Forgotten subscriptions** draining your wallet
- ⏰ **Missed free trial cancellations**
- 🔍 **Hidden recurring charges** on credit cards
- 📈 **No visibility** into monthly subscription costs

### ✅ Our Solution
- 📱 **Centralized dashboard** for all subscriptions
- 🔔 **Smart reminders** before renewals
- 📊 **Detailed analytics** and spending insights
- 💡 **Optimization suggestions** to save money

## ⚡ Features

<table>
<tr>
<td width="50%">

### 🔐 **Authentication & Security**
- JWT-based secure authentication
- Password hashing with bcrypt
- Role-based access control
- API rate limiting

</td>
<td width="50%">

### 📊 **Dashboard & Analytics**
- Monthly expense summaries
- Interactive charts and graphs
- Spending trend analysis
- Category-wise breakdowns

</td>
</tr>
<tr>
<td>

### 💳 **Subscription Management**
- Add, edit, delete subscriptions
- Track multiple currencies
- Flexible billing cycles
- Custom categories

</td>
<td>

### 🔔 **Smart Notifications**
- Email reminders before renewals
- Customizable notification timing
- Free trial expiration alerts
- Monthly spending reports

</td>
</tr>
<tr>
<td>

### 📄 **Data Management**
- CSV import/export functionality
- Backup and restore options
- Data visualization tools
- Search and filtering

</td>
<td>

### 📱 **Modern UI/UX**
- Responsive design (mobile-first)
- Clean, intuitive interface
- Dark/light mode support
- Accessibility compliant

</td>
</tr>
</table>

## 🏗️ Architecture

```mermaid
graph TD
    A[🌐 Frontend<br/>React + Vite<br/>Port: 5173] <--> B[⚡ Backend<br/>FastAPI<br/>Port: 8000]
    B <--> C[🗄️ PostgreSQL<br/>Database]
    B <--> D[🔄 Redis<br/>Cache & Tasks]
    B <--> E[📧 Celery<br/>Background Jobs]
    F[🐳 Docker<br/>Containerization] -.-> A
    F -.-> B
    F -.-> C
    F -.-> D
```

## 🛠️ Tech Stack

<details>
<summary><b>🎨 Frontend Technologies</b></summary>

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18+ | UI Framework |
| **Vite** | Latest | Build Tool & Dev Server |
| **Tailwind CSS** | 3+ | Styling & Design |
| **React Router** | 6+ | Client-side Routing |
| **Axios** | Latest | HTTP Client |
| **Chart.js** | Latest | Data Visualization |

</details>

<details>
<summary><b>⚙️ Backend Technologies</b></summary>

| Technology | Version | Purpose |
|------------|---------|---------|
| **FastAPI** | 0.104+ | Web Framework |
| **PostgreSQL** | 15+ | Primary Database |
| **SQLAlchemy** | 2+ | ORM |
| **Redis** | 7+ | Caching & Task Queue |
| **Celery** | 5+ | Background Tasks |
| **JWT** | - | Authentication |

</details>

<details>
<summary><b>🚀 DevOps & Infrastructure</b></summary>

| Technology | Purpose |
|------------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Local Development |
| **Nginx/Traefik** | Reverse Proxy |
| **GitHub Actions** | CI/CD Pipeline |
| **AWS/GCP** | Cloud Deployment |

</details>

## 🚀 Quick Start

### Prerequisites
- 🐳 Docker & Docker Compose
- 📦 Node.js 18+ (for manual setup)
- 🐍 Python 3.11+ (for manual setup)

### Option 1: Docker (Recommended) 🐳

```bash
# Clone the repository
git clone https://github.com/Parvezkhan0/subscription-expense-tracker.git
cd subscription-expense-tracker

# Start all services with Docker Compose
docker-compose up --build

# 🎉 That's it! Your app is running:
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Option 2: Manual Setup 🛠️

<details>
<summary>Click to expand manual setup instructions</summary>

#### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
alembic upgrade head

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

</details>

## 🌐 API Documentation

### 🔑 Authentication Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/signup` | POST | Register new user |
| `/auth/login` | POST | User authentication |
| `/auth/refresh` | POST | Refresh JWT token |
| `/auth/logout` | POST | User logout |

### 💳 Subscription Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/subscriptions/` | GET | List all subscriptions |
| `/subscriptions/` | POST | Create new subscription |
| `/subscriptions/{id}` | PUT | Update subscription |
| `/subscriptions/{id}` | DELETE | Delete subscription |

### 📊 Analytics Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/dashboard/summary` | GET | Monthly summary |
| `/analytics/trends` | GET | Spending trends |
| `/analytics/categories` | GET | Category breakdown |

> 📖 **Full API Documentation:** Visit `http://localhost:8000/docs` after starting the backend

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/subscription_db

# JWT
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Redis
REDIS_URL=redis://localhost:6379

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

#### Frontend (.env)
```bash
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=Subscription Tracker
```

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest tests/ -v --coverage

# Frontend tests
cd frontend
npm run test

# E2E tests
npm run test:e2e
```

## 📦 Deployment

### 🐳 Docker Production

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
```

### ☁️ Cloud Deployment

<details>
<summary><b>AWS Deployment Guide</b></summary>

1. **Setup RDS PostgreSQL**
2. **Setup ElastiCache Redis**
3. **Deploy to ECS/EKS**
4. **Configure CloudFront**
5. **Setup Route53 DNS**

See [deployment guide](docs/DEPLOYMENT.md) for detailed instructions.

</details>

## 🔒 Security Features

- 🛡️ **JWT Authentication** with refresh tokens
- 🔐 **Password hashing** using bcrypt
- 🚫 **Rate limiting** on API endpoints
- 🔒 **HTTPS enforcement** in production
- 🛂 **Input validation** with Pydantic
- 🔍 **SQL injection** prevention

## 🚀 Roadmap

### 🎯 Version 2.0 (Q2 2024)
- [ ] 🤖 AI-powered subscription optimization
- [ ] 📱 Mobile app (React Native)
- [ ] 🔍 OCR for receipt scanning
- [ ] 📈 Advanced analytics dashboard

### 🎯 Version 3.0 (Q3 2024)
- [ ] 💬 WhatsApp/Telegram notifications
- [ ] 🌍 Multi-currency support
- [ ] 👥 Family/team sharing
- [ ] 🎨 Custom themes and branding

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/Parvezkhan0/subscription-expense-tracker?style=social)
![GitHub forks](https://img.shields.io/github/forks/Parvezkhan0/subscription-expense-tracker?style=social)
![GitHub issues](https://img.shields.io/github/issues/Parvezkhan0/subscription-expense-tracker)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Parvezkhan0/subscription-expense-tracker)

</div>

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### 🛠️ Development Process
1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💍 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🎉 Open a Pull Request

### 📋 Contribution Guidelines
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Be respectful and collaborative


---

<div align="center">

**⭐ If you found this project helpful, please give it a star!**

Made with ❤️ by [Parvez Khan](https://github.com/Parvezkhan0)

</div>
