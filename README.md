# Private Notes App

A secure, full-stack personal notes application built with React, Node.js, Express, and Supabase. This project demonstrates a complete authentication flow using JWTs, HTTP-only cookies, and Row Level Security (RLS) to ensure data privacy.

## Project Overview

**Goal:** Build a simple, secure Personal Notes App where only the authenticated user can see and manage their notes.

**Key Features:**

-   **User Authentication:** Secure Signup, Login, and Logout functionality.
-   **Protected Dashboard:** Access is restricted to logged-in users only.
-   **CRUD Operations:** Create, Read, Update, and Delete personal notes.
-   **Data Privacy:** Implements Row Level Security (RLS) in Supabase so users can strictly access only their own data.

## Tech Stack

-   **Frontend:** React.js (Vite), Tailwind CSS
-   **Backend:** Node.js, Express.js
-   **Database & Auth:** Supabase (PostgreSQL)
-   **Security:** JWT Tokens, HTTP-only Cookies, RLS Policies

## Project Structure

```
notes-app/
├── server/                 # Backend (Node.js + Express)
│   ├── middleware/         # Auth middleware (JWT verification)
│   ├── routes/             # API routes (Auth, Notes)
│   ├── db_schema.sql       # Database schema & RLS policies
│   ├── index.js            # Server entry point
│   └── supabaseClient.js   # Supabase client configuration
├── src/                    # Frontend (React)
│   ├── pages/              # Page components (Login, Register, Dashboard)
│   ├── App.tsx             # Main app component & Routing
│   └── main.tsx            # React entry point
├── PRD.md                  # Product Requirements Document
└── ...config files
```

## Setup Instructions

### Prerequisites

-   Node.js installed
-   A Supabase account

### 1. Database Setup

1.  Create a new project in Supabase.
2.  Go to the SQL Editor in your Supabase dashboard.
3.  Copy the contents of `server/db_schema.sql` and run it to create the `notes` table and enable RLS policies.

### 2. Backend Setup

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory and add your Supabase credentials:
    ```env
    PORT=5000
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_anon_key
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```

### 3. Frontend Setup

1.  Open a new terminal and navigate to the root directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the React development server:
    ```bash
    npm run dev
    ```

## API Endpoints

| Method | Endpoint           | Description                | Access    |
| :----- | :----------------- | :------------------------- | :-------- |
| POST   | `/api/auth/signup` | Register a new user        | Public    |
| POST   | `/api/auth/login`  | Login user & set cookie    | Public    |
| POST   | `/api/auth/logout` | Logout user & clear cookie | Protected |
| GET    | `/api/notes`       | Fetch user's notes         | Protected |
| POST   | `/api/notes`       | Create a new note          | Protected |
| PUT    | `/api/notes/:id`   | Update a note              | Protected |
| DELETE | `/api/notes/:id`   | Delete a note              | Protected |

---

_This README was proofread/updated by AI for transparency._
