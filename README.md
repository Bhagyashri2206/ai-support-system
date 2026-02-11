# AI Support System – Full Stack Assignment

This project is a full-stack AI-powered support system built as part of a Full Stack Engineer assessment.  
It demonstrates agent-based request handling, API design, frontend-backend integration, and database usage.

---

## 🚀 Tech Stack

### Frontend
- React
- Vite
- TypeScript
- Fetch API

### Backend
- Hono.dev
- Node.js
- TypeScript

### Database
- PostgreSQL (Neon – Cloud Hosted)

### ORM
- Prisma

### AI Layer
- Vercel AI SDK

---

## 📁 Project Structure

ai-support-system/
├── backend/
│   ├── src/
│   │   ├── app.ts
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── services/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── index.html
│
├── README.md
└── .gitignore

---

## ⚙️ Features Implemented

- Health check API
- Agent listing API
- AI chat endpoint
- Agent-based routing
- PostgreSQL database integration
- Prisma ORM with schema & seed
- Frontend chat interface
- CORS-enabled frontend-backend communication

---

## 🔁 Agent Routing Logic

User queries are routed based on intent:

- Support Agent → general help
- Order Agent → order & delivery queries
- Billing Agent → payment & refund queries

---

## 🔌 API Endpoints

### Health Check
GET /api/health

Response:
{
  "status": "ok"
}

---

### Agents
GET /api/agents

Response:
[
  { "type": "support", "description": "General support queries" },
  { "type": "order", "description": "Order related queries" },
  { "type": "billing", "description": "Billing and payment queries" }
]

---

### Chat
POST /api/chat/messages

Request:
{
  "message": "Where is my order?"
}

Response:
{
  "agent": "order",
  "response": "Your order status is: shipped"
}

---

## 🧪 Sample Queries

- "I need help" → Support Agent
- "Where is my order?" → Order Agent
- "Refund status?" → Billing Agent

---

## 🗄️ Database

- PostgreSQL hosted on Neon
- Managed using Prisma ORM

Models:
- Conversation
- Message
- Order
- Payment

Commands used:
npx prisma db push
npx prisma generate
node prisma/seed.js

---

## ▶️ Running the Project Locally

### Backend
cd backend
npm install
npm run dev

Runs on:
http://localhost:3000

---

### Frontend
cd frontend
npm install
npm run dev

Runs on:
http://localhost:5173

---

## 🔐 Environment Variables

Create a .env file inside backend/

---

## 🌐 Deployment

- Local setup completed
- Deployment not required for this assessment
- Project is deployment-ready

---

## 🧠 Notes

- Vercel AI SDK is used for agent-based AI responses
- UI state resets on refresh (no persistence required)
- Focus is on architecture and logic

---

## ✅ Assessment Coverage

✔ Full stack implementation  
✔ Required tech stack  
✔ Backend APIs  
✔ Database integration  
✔ AI-based routing  
✔ Functional frontend  

---

## 👤 Author

Bhagyashri Pachpute  
Full Stack Engineer
