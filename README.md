# Vartur Catalog API

A fully featured, production-grade **Catalog API** built with **Fastify**, **TypeScript**, **Prisma**, **Redis**, and **Swagger**.  
Supports **authentication**, **authorization (RBAC)**, **CRUD operations** for **categories** and **products**, and **secure error handling**.

---

## Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Future Improvements](#-future-improvements)

---

## Features

- User authentication with **JWT**
- **Role-based access control (RBAC)**: Admins can create/update/delete, Users can read
- Full **CRUD** for **Categories** and **Products**
- **Global error handling** with custom `AppError`
- **Swagger** documentation at `/docs`
- **Redis** integration for session management
- **Prisma** ORM for database communication
- Input **validation** with **Zod**
- Modular architecture: **routes**, **controllers**, **services**

---

## Tech Stack

- **Fastify** (Server)
- **TypeScript** (Language)
- **Prisma** (ORM)
- **MySQL** (Database)
- **Redis** (Caching / Token storage)
- **Zod** (Validation)
- **Swagger** (API Documentation)
- **ts-node-dev** (Hot Reload)

---

## Getting Started

### 1. Clone the project

```bash
git clone https://github.com/abdallahhany/vartur-catalog-api.git
cd vartur-catalog-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file at the root:

```dotenv
DATABASE_URL="mysql://username:password@localhost:3306/vartur_catalog"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="supersecret"
PORT=3000
```

### 4. Run Migrations

```bash
npm run migrate
```

### 5. Seed Data

```bash
npm run seed
```

### 6. Start the development server

```bash
npm run dev
```

Server will run at `http://localhost:3000/`.

---

## API Authentication

- Login via `/api/auth/login` to receive a **JWT token**.
- Attach the token to the `Authorization` header like:

```http
Authorization: Bearer your-token-here
```

👉 Only **admins** can create/update/delete categories and products.

---

## API Documentation

Interactive API docs available at:

> http://localhost:3000/docs

Powered by **Swagger UI**!

---

## How to Use Endpoints

- **Auth:**
  - `POST /api/auth/login` - Login and get JWT
  - `POST /api/auth/register` - Register a new user

- **Categories:**
  - `POST /api/categories` - Create category (Admin only)
  - `GET /api/categories` - List categories
  - `GET /api/categories/:id` - Get category by ID
  - `PUT /api/categories/:id` - Update category (Admin only)
  - `DELETE /api/categories/:id` - Delete category (Admin only)

- **Products:**
  - `POST /api/products` - Create product (Admin only)
  - `GET /api/products` - List products
  - `GET /api/products/:id` - Get product by ID
  - `PUT /api/products/:id` - Update product (Admin only)
  - `DELETE /api/products/:id` - Delete product (Admin only)

---

## Project Structure

```
src/
├── config/        # Environment and Redis setup
├── controllers/   # Request controllers
├── plugins/       # Fastify plugins (Prisma, JWT, Redis, Auth middleware)
├── routes/        # API route definitions
├── schemas/       # Zod validation schemas
├── services/      # Business logic (DB operations)
├── types/         # Type definitions
├── utils/         # Helpers (hashing, JWT, AppError)
├── app.ts         # Fastify app initialization
└── server.ts      # Server startup
```

---

## Future Improvements

- Add **Refresh Tokens**
- Implement **Pagination** and **Filtering**
- Add **Soft Deletes**
- Create **Unit & Integration Tests** with Jest
- Add **Docker Compose** for running app + DB + Redis
- Implement **CI/CD** pipelines

---

## Author

Made by Abdallah Hany.
