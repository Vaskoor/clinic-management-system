# 🏥 Clinic Management System

A modern full-stack clinic management platform built with **FastAPI** and **Next.js 14**, designed to streamline healthcare operations for patients, doctors, pharmacists, and administrators.

The platform provides secure authentication, appointment scheduling, patient record management, prescription handling, inventory tracking, and role-based dashboards in a responsive and user-friendly interface.

---

## ✨ Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Secure login and registration
* Role-based access control (RBAC)
* Protected API routes

### 👨‍⚕️ Doctor Dashboard

* Manage appointments
* View patient medical history
* Create and update prescriptions
* Configure availability schedules

### 🧑‍⚕️ Patient Dashboard

* Book and manage appointments
* Access medical records
* View prescriptions
* Track appointment history

### 💊 Pharmacist Dashboard

* Process prescriptions
* Manage medication inventory
* Track stock availability
* Monitor medicine expiry dates

### 📅 Appointment Management

* Schedule appointments
* Reschedule existing appointments
* Cancel appointments
* Time-slot validation

### 📦 Inventory Management

* Medicine stock tracking
* Expiry date monitoring
* Low-stock alerts
* Inventory reporting

### 🎨 Modern User Interface

* Next.js 14 App Router
* TypeScript support
* Tailwind CSS
* shadcn/ui components
* Responsive design

### 🐳 Docker Support

* Containerized deployment
* Docker Compose support
* One-command startup

---

## 🧰 Tech Stack

| Layer          | Technology                                      |
| -------------- | ----------------------------------------------- |
| Backend        | FastAPI, SQLAlchemy, Pydantic, Python-JWT       |
| Frontend       | Next.js 14, TypeScript, Tailwind CSS, shadcn/ui |
| Database       | SQLite (Development), PostgreSQL (Production)   |
| API Client     | Axios                                           |
| Authentication | JWT                                             |
| Deployment     | Docker, Docker Compose, Vercel, Railway         |

---

## 📋 Prerequisites

Before getting started, ensure you have:

* Python 3.10+
* pip
* Node.js 18+
* npm or yarn
* Docker & Docker Compose (optional)

---

# 🚀 Local Development Setup

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

---

## 2. Backend Setup (FastAPI)

Navigate to the backend directory:

```bash
cd backend
```

### Create Virtual Environment

```bash
python -m venv venv
```

Activate environment:

**Linux/macOS**

```bash
source venv/bin/activate
```

**Windows**

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Create Environment File

```bash
cp .env.example .env
```

### Initialize Database

```bash
python init_db.py
```

### Start Backend Server

```bash
uvicorn app.main:app --reload --port 8000
```

Backend URL:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

---

## 3. Frontend Setup (Next.js)

Open a new terminal:

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

```bash
cp .env.local.example .env.local
```

### Start Development Server

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

---

## 🔧 Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL=sqlite:///./clinic.db

# PostgreSQL Example
# DATABASE_URL=postgresql://username:password@localhost/dbname

SECRET_KEY=your-super-secret-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> The frontend expects the backend API to run on port `8000`.

---

## 🐳 Docker Setup

Run the complete application stack:

```bash
docker-compose up --build
```

Services:

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:8000 |

Docker Compose includes:

* Frontend Container
* Backend Container
* Persistent Database Storage

---

## 🗄️ Database Initialization

Initialize database manually:

```bash
cd backend
python init_db.py
```

### Reset Database

```bash
rm clinic.db
python init_db.py
```

This will recreate all tables and seed demo data (if configured).

---

## 🧪 API Testing

### Using Swagger UI

1. Start backend server
2. Open:

```text
http://localhost:8000/docs
```

3. Test:

* POST `/auth/register`
* POST `/auth/login`
* Appointment APIs
* Patient APIs
* Doctor APIs
* Pharmacist APIs

4. Use the **Authorize** button and paste your JWT token.

---

## 📁 Project Structure

```text
.
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── appointments.py
│   │   │   ├── doctors.py
│   │   │   ├── patients.py
│   │   │   └── pharmacists.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   ├── config.py
│   │   └── main.py
│   ├── requirements.txt
│   ├── init_db.py
│   ├── Dockerfile
│   └── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── styles/
│   ├── package.json
│   ├── Dockerfile
│   └── .env.local
│
├── docker-compose.yml
└── README.md
```

---

## 🚢 Production Deployment

### Backend

For production deployments:

```bash
gunicorn app.main:app \
  -k uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000
```

Recommended:

* PostgreSQL database
* HTTPS enabled
* Environment variables secured

### Frontend

Build application:

```bash
npm run build
npm start
```

Recommended deployment platforms:

* Vercel
* Netlify
* Docker
* VPS

Set:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

---

## 🤝 Contributing

Contributions are welcome.

### Steps

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "Add amazing feature"
```

4. Push to GitHub

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

See the `LICENSE` file for more details.

---

## 📧 Support

If you encounter issues or have feature requests:

* Open a GitHub Issue
* Submit a Pull Request
* Contact the maintainers

---

## ⭐ Acknowledgements

Built with:

* FastAPI
* Next.js
* SQLAlchemy
* PostgreSQL
* Tailwind CSS
* shadcn/ui
* Docker

If you find this project useful, consider giving it a ⭐ on GitHub.
