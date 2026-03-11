# fs-auth

A simple full-stack authentication system with email verification.

## Tech Stack

- **Backend** — Node.js, Express, MongoDB, JWT
- **Frontend** — React, Vite, TanStack Query

## Setup

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
JWT_SECRET=your_secret_key
EMAIL_ID=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Run the server:

```bash
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## How It Works

1. User registers with name, email, and password
2. Verification email is sent
3. User clicks the link to verify email
4. User logs in and is redirected to profile page
