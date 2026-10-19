# Contact Management App (MERN Stack)

A full-stack web app built from scratch with React, Node.js, Express and MongoDB. Users and admins have separate signup/login flows. Users can send messages and view their own, while admins get a dashboard with full CRUD over all messages.

## Features

- **Role-based authentication:** separate Signup/Login for **User** and **Admin**
- **Password hashing** with bcrypt (no plain-text passwords in the database)
- **Role check on login:** admin credentials cannot be used on the User login, and vice versa
- **Protected routes** on the frontend: only the correct role can open `/user` or `/admin`
- **User page:** send a message and view only your own messages
- **Admin page:** view all messages and **Add, Edit, Delete** them (full CRUD)
- Data stored in **MongoDB** using Mongoose

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React (Vite), React Router |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Security | bcryptjs, CORS |

## Project Structure

```
contact_project/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── messages.js
│   └── server.js
└── client/
    └── src/
        ├── pages/
        │   ├── Home.jsx
        │   ├── Auth.jsx
        │   ├── UserPage.jsx
        │   └── AdminPage.jsx
        ├── App.jsx
        └── index.css
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally on the default port (27017)
- MongoDB Compass (optional, to view the data)

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd contact_project
```

### 2. Start the backend

```bash
cd server
npm install
node server.js
```

You should see:

```
Server running on port 5000
MongoDB Connected
```

### 3. Start the frontend

Open a **new terminal**:

```bash
cd client
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Usage

1. Open the home page and choose **User** or **Admin**.
2. Sign up, then log in.
3. **User:** send a message and see it under "My Messages".
4. **Admin:** view all messages in the table and use **Add**, **Edit** and **Delete**.
5. Open MongoDB Compass, connect to `contact_demo`, and check the `users` (hashed passwords) and `messages` collections.

## API Endpoints

Base URL: `http://localhost:5000`

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register a new user or admin |
| POST | `/auth/login` | Log in (email, password and role must match) |

### Messages

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/messages` | Create a message |
| GET | `/messages` | Get all messages (use `?email=` to filter by user) |
| PUT | `/messages/:id` | Update a message |
| DELETE | `/messages/:id` | Delete a message |

## Database Models

**User**

| Field | Type |
|-------|------|
| name | String |
| email | String (unique) |
| password | String (hashed) |
| role | `user` or `admin` |

**Message**

| Field | Type |
|-------|------|
| name | String |
| email | String |
| message | String |
| createdAt / updatedAt | Date (automatic) |

## Known Limitations

This project is intentionally kept simple for demonstration purposes:

- No JWT or session tokens. Route protection is handled on the frontend only, so the API routes are not secured server-side.
- Anyone can choose the `admin` role at signup.
- The user session is stored in `localStorage`.

**Planned improvements for production:**
- JWT authentication with server-side admin middleware
- Restrict admin signup (invite-only or seeded admin)
- Input validation and error handling
- Environment variables (`.env`) for the database URL and port

## Author

**Ezza**
BS Information Technology, International Islamic University Islamabad (IIUI)
