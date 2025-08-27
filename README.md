📦 Subscription Expense Tracker – Full-Stack Application

Subscription Expense Tracker is a full-stack app built with React (frontend) and FastAPI (backend).
It helps users manage recurring subscriptions, control expenses, and gain financial clarity with reminders, summaries, and insights.

🏗️ Architecture
┌──────────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend           │    │   Backend       │    │ Infrastructure  │
│   (React + Vite)     │◄──►│   (FastAPI)     │◄──►│ PostgreSQL +    │
│   Port: 5173         │    │   Port: 8000    │    │ Redis + Docker  │
└──────────────────────┘    └─────────────────┘    └─────────────────┘

❓ Problem It Solves

Most people use multiple subscriptions (Netflix, Spotify, SaaS, etc.) and often face:

Missed renewal reminders 💸

Forgotten free trials ⏰

Overlapping/hidden charges 💳

✅ This project fixes that by:

Tracking all subscriptions in one place

Sending reminders before renewals

Showing monthly expense summaries

Helping optimize/cancel unused subscriptions

🧠 Features

🔐 User Authentication (JWT)

📊 Dashboard with monthly analytics

💳 Subscription CRUD operations

🧾 Expense tracking & CSV import/export

📩 Renewal reminders via email

📱 Responsive UI with Tailwind CSS

⚡ API documentation via Swagger

🛠️ Tech Stack
🔹 Frontend

React 18 + Vite

Tailwind CSS

React Router DOM

Axios

🔹 Backend

FastAPI

PostgreSQL + SQLAlchemy

Redis + Celery

JWT Authentication

Gunicorn + Uvicorn

🔹 Infra & Tools

Docker + Docker Compose

Nginx / Traefik (reverse proxy in prod)

GitHub Actions (CI/CD ready)

📥 Setup Instructions
🔧 Clone Repo
git clone https://github.com/Parvezkhan0/subscription-expense-tracker.git
cd subscription-expense-tracker

🚀 Run with Docker (Recommended)
docker-compose up --build


Frontend → http://localhost:5173

Backend API → http://localhost:8000

API Docs → http://localhost:8000/docs

Health Check → http://localhost:8000/health

🖥️ Run Manually (Dev mode)
Frontend
cd frontend
npm install
npm run dev

Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

🌐 API Endpoints (Examples)
Endpoint	Method	Description
/auth/signup	POST	Register new user
/auth/login	POST	Authenticate & get token
/subscriptions/	GET	List subscriptions
/expenses/	POST	Add new expense
/dashboard/summary	GET	Monthly summary
/notifications/	GET	Renewal reminders
⚙️ Scalability & Deployment

Backend served with Gunicorn + Uvicorn workers

PostgreSQL on AWS RDS, Redis via AWS ElastiCache

Dockerized for portability

CI/CD with GitHub Actions (Lint → Test → Deploy)

Container orchestration with ECS / Kubernetes

🔐 Security Practices

JWT Authentication with expiry

Role-based access control

Input validation (Pydantic)

Password hashing (bcrypt)

HTTPS with Traefik + Certbot

API rate limiting (slowapi)

🧩 Future Enhancements

🤖 AI-powered subscription optimization

📈 Expense trend predictions

📱 Mobile app (React Native)

🧾 OCR for bank statement PDFs

💬 WhatsApp/Telegram reminders

📸 Screenshots / Demo

(Add app screenshots or a Loom demo video link here for interviews)

📚 Documentation

Frontend: /frontend folder

Backend: /backend folder

API Docs: http://localhost:8000/docs

🤝 Contributing

Fork the repo

Create a feature branch

Commit changes

Open a PR 🚀

🔗 Useful Links

Repo → subscription-expense-tracker

Frontend → http://localhost:5173

Backend API → http://localhost:8000

API Docs → http://localhost:8000/docs

Health → http://localhost:8000/health

📞 Support

For issues, open a GitHub issue or reach out via your GitHub profile.