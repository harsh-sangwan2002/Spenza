# 🛰️ Webhook Subscription & Delivery System

A full-stack application to manage webhook subscriptions, trigger events, and deliver them asynchronously using RabbitMQ. Includes:

- Webhook subscription management (source URL, callback URL, event types)
- Asynchronous delivery with retry mechanism
- Signature verification and delivery logging
- Dashboard UI to create, manage, and view webhook logs

https://github.com/user-attachments/assets/f1c411ff-ee7a-462c-89b9-e8c9c96d5ea2

---

## 📁 Project Structure

```

.
├── client # Frontend (React + Ant Design)
└── server # Backend (Node.js + Express + MongoDB + RabbitMQ)

```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB
- RabbitMQ (Docker recommended)
- Yarn / npm

---

## 🧠 Features

- 🔐 Webhook subscription with `sourceUrl`, `callbackUrl`, `eventTypes`
- ✅ JWT-secured endpoints and signature verification
- 🐇 RabbitMQ-based event queue with retry logic
- 📊 Delivery logging for each webhook
- 📋 Dashboard UI to trigger events, delete webhooks, and view logs

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/harsh-sangwan2002/Spenza.git
cd webhook-platform
```

---

### 2. Backend Setup (`server/`)

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

#### ✅ Environment Variables (`.env`)

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/webhooks
JWT_SECRET=your_jwt_secret
WEBHOOK_AUTH_TOKEN=some_shared_secret
RABBITMQ_URL=amqp://localhost
```

#### 🐇 Start RabbitMQ (with Docker)

```bash
docker run -d --hostname rabbit --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

#### 🚀 Run Backend Server and Worker

```bash
# Start API server
npm run dev

# In a separate terminal, start the worker
node workers/webhookWorker.js
```

---

### 3. Frontend Setup (`client/`)

```bash
cd client

# Install dependencies
npm install

# Start frontend
npm run dev
```

> React app runs on: `http://localhost:5173`
> Backend API runs on: `http://localhost:3000`

---

## 🧪 Testing the Flow

1. Create a webhook in the dashboard UI
2. Click “Trigger” on a webhook to simulate an event
3. The backend enqueues the event
4. The worker delivers the event to the `callbackUrl`
5. View logs via “View Logs” in the dashboard

---

## 📂 API Overview

### POST `/api/webhooks`

Create a new webhook subscription.

### POST `/api/webhooks/trigger`

Trigger a webhook event manually.

### GET `/api/webhooks`

Get all active webhooks.

### DELETE `/api/webhooks/:id`

Cancel a webhook subscription.

### GET `/api/webhooks/logs/:subscriptionId`

Get delivery logs for a webhook.

---

## 📸 Screenshots

Coming soon...

---

## 🛠 Tech Stack

- **Frontend**: React, Ant Design
- **Backend**: Express.js, MongoDB, Mongoose
- **Messaging**: RabbitMQ
- **Worker**: Node.js + Axios + Retry Logic
- **Auth**: JWT, HMAC signature validation

---

## 🙌 Acknowledgements

- RabbitMQ Docs
- MongoDB Atlas
- Webhook.site for testing

---

## 📜 License

This project is licensed under the MIT License.
