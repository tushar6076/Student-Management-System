# Learnova | AI-Powered Quiz System

## 🚀 Tech Stack
- **Frontend:** React.js, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express
- **Database:** Prisma ORM with MongoDB
- **Caching:** Redis (OTP & Session Management)
- **Containerization:** Docker & Docker Compose

## 🛠️ Project Structure
```text
.
├── backend/             # Node.js Express API
│   ├── prisma/          # Database Schema
│   ├── src/             # Logic, Controllers, Routes
│   └── Dockerfile
├── frontend/            # React + Vite App
│   ├── src/             # Components, Pages, State
│   └── Dockerfile
├── docker-compose.yml   # Multi-container Orchestration
├── .gitignore           # Global git exclusions
└── README.md            # Documentation
⚙️ Quick Start (Docker)
Clone and Setup Environment:

Bash
# Create a .env file in the root directory
touch .env
# Add: JWT_SECRET=your_secret_here
Launch Infrastructure:

Bash
docker-compose up --build
Frontend: http://localhost:5173

Backend: http://localhost:5000

MongoDB: http://localhost:27017

💻 Manual Setup
Backend
Bash
cd backend
npm install
npx prisma generate
npm start
Frontend
Bash
cd frontend
npm install
npm run dev
🔐 Environment Variables
Backend (.env)
PORT: 5000

DATABASE_URL: mongodb://localhost:27017/studentDB

REDIS_URL: redis://localhost:6379

JWT_SECRET: your_secure_string

Frontend (.env)
VITE_API_URL: http://localhost:5000/api

📜 License
This project is licensed under the MIT License.


**Everything is ready! Just copy-paste that into your `README.md`.