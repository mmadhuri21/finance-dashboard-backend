# Finance Dashboard Backend

## Overview

This project implements a backend service for a finance dashboard. It supports user management, financial record handling, and summary analytics with role-based access control.

The implementation focuses on clean API design, clear separation of concerns, and correct handling of business logic rather than adding unnecessary complexity.

---

## Tech Stack

- Node.js
- Express
- TypeScript
- Prisma ORM
- SQLite
- Zod (validation)
- JWT (authentication)
- bcrypt (password hashing)

---

## Architecture

The codebase is structured by responsibility:

- routes → define API endpoints  
- controllers → handle request and response  
- services → contain business logic  
- middleware → authentication, authorization, validation, error handling  
- prisma → database access layer  

This separation keeps the system easy to understand and extend.

---

## Data Model

### User

Fields:
- name
- email
- password
- role
- status

Roles:
- VIEWER
- ANALYST
- ADMIN

Status:
- ACTIVE
- INACTIVE

---

### FinancialRecord

Fields:
- amount
- type (INCOME / EXPENSE)
- category
- date
- notes
- createdById

---

## Access Control

Access is enforced using middleware.

- Viewer → can access dashboard summary  
- Analyst → can view records and summary  
- Admin → full access (users + records)  

Inactive users are blocked from logging in.

---

## Features

### Authentication
- user registration  
- login with JWT  
- password hashing  

### User Management
- get all users (admin only)  
- update user name, role, or status  
- inactive users cannot log in  

### Financial Records
- create records (admin)  
- view records (admin, analyst)  
- update records (admin)  

Filtering supported:
- by type  
- by category  
- by date range  

### Dashboard
Provides aggregated data:
- total income  
- total expense  
- net balance  
- category-wise totals  
- total records count  

### Validation and Error Handling
- input validation using Zod  
- consistent JSON error responses  
- proper HTTP status codes  

---

## API Endpoints

### Auth
- POST /api/auth/register  
- POST /api/auth/login  

### Users (Admin only)
- GET /api/users  
- PATCH /api/users/:id  

### Records
- POST /api/records  
- GET /api/records  
- PATCH /api/records/:id  

### Dashboard
- GET /api/dashboard/summary  

---

## Setup

Install dependencies:

    npm install

---

## Running and Testing Locally

Start the server:

    npm run dev

Server will run at:

    http://localhost:5000

---

### How to Test the APIs

You can use:
- Thunder Client (VS Code)
- Postman

---

### Basic Test Flow

1. Register a user  
   POST /api/auth/register  

2. Login  
   POST /api/auth/login  

3. Copy the token from response  

4. Use token in headers  
   Authorization: Bearer <your_token>

5. Create a record  
   POST /api/records  

6. Fetch records  
   GET /api/records  

7. Get dashboard summary  
   GET /api/dashboard/summary  
