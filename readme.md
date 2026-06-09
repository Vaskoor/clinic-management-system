# 🏥 Clinic Management System

A full‑stack clinic management platform built with **FastAPI** (backend) and **Next.js 14** (frontend).  
Designed for multi‑role access: patients, doctors, pharmacists, and administrators.  
Includes appointment scheduling, inventory tracking, patient records, and role‑based dashboards.

---

## ✨ Features

- 🔐 **Authentication & Authorization** – JWT‑based login, registration, role‑specific access  
- 👨‍⚕️ **Doctor Dashboard** – View appointments, manage patient records, update availability  
- 🧑‍⚕️ **Patient Dashboard** – Book appointments, view medical history, prescriptions  
- 💊 **Pharmacist Dashboard** – Manage medication inventory, process prescriptions  
- 📅 **Appointment System** – Schedule, reschedule, cancel with time‑slot validation  
- 📦 **Inventory Management** – Stock levels, expiry tracking, low‑stock alerts  
- 🎨 **Modern UI** – Next.js App Router, Tailwind CSS, shadcn/ui components  
- 🐳 **Docker Support** – Run both backend and frontend with a single command  

---

## 🧰 Tech Stack

| Layer       | Technology                                                                 |
|-------------|----------------------------------------------------------------------------|
| Backend     | FastAPI, SQLAlchemy, Pydantic, Python‑JWT, SQLite / PostgreSQL            |
| Frontend    | Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Axios        |
| Database    | SQLite (dev) / PostgreSQL (prod)                                           |
| Deployment  | Docker, Docker Compose, could be deployed to Vercel + Railway/Hugging Face |

---

## 📋 Prerequisites

- **Python 3.10+** with `pip`
- **Node.js 18+** with `npm` or `yarn`
- (Optional) **Docker** and **Docker Compose**

---

## 🚀 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO