# 📬 Postman Testing Guide

## ⚙️ Setup

### 1. Environment Variables
Create a Postman **Environment** called `Todo API` with these variables:

| Variable       | Initial Value              |
|----------------|----------------------------|
| `base_url`     | `http://localhost:3000`    |
| `access_token` | _(leave empty)_            |
| `refresh_token`| _(leave empty)_            |

### 2. Start the Server
```bash
npm run db:seed   # Seeds admin@todoapp.com / Admin@123
npm run dev       # Starts server on port 3000
```

---

## 🔐 Auth Endpoints (`/api/auth`)

> No token required for these routes.

---

### POST `/api/auth/signup`
Register a new user account.

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Expected Response `201`:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Signup successful. Please check your email to verify your account.",
  "data": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

> ⚠️ You must verify your email before you can log in. Check your inbox for a verification link.

---

### GET `/api/auth/verify-email?token=TOKEN`
Verify a user's email using the token sent to their inbox.

**Query Param:**
```
token = <token from email>
```

**Expected Response `200`:**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

---

### POST `/api/auth/login`
Log in and receive tokens.

**Body (raw JSON):**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Expected Response `200`:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ...",
    "user": {
      "id": "...",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER"
    }
  }
}
```

> 💡 **Save tokens:** Copy `accessToken` → paste into `access_token` env variable. Same for `refreshToken`.

---

### POST `/api/auth/refresh-token`
Get a new access token using your refresh token.

**Body (raw JSON):**
```json
{
  "refreshToken": "{{refresh_token}}"
}
```

**Expected Response `200`:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJ..."
  }
}
```

---

### POST `/api/auth/logout`
Revoke the refresh token.

**Body (raw JSON):**
```json
{
  "refreshToken": "{{refresh_token}}"
}
```

**Expected Response `200`:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## ✅ Todo Endpoints (`/api/todos`)

> 🔒 All routes require: `Authorization: Bearer {{access_token}}`

**Headers for all Todo requests:**
```
Authorization: Bearer {{access_token}}
Content-Type: application/json
```

---

### POST `/api/todos`
Create a new todo.

**Body (raw JSON):**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Expected Response `201`:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": "PENDING",
    "isCompleted": false,
    "userId": "...",
    "createdAt": "..."
  }
}
```

---

### GET `/api/todos`
Get all todos for the logged-in user.

**Optional Query Params:**
```
?status=PENDING
?status=IN_PROGRESS
?status=COMPLETED
?status=CANCELLED
```

**Expected Response `200`:**
```json
{
  "success": true,
  "data": [ { ... }, { ... } ]
}
```

---

### GET `/api/todos/stats`
Get todo counts by status for the logged-in user.

> ⚠️ Call this **before** `/api/todos/:id` — otherwise `:id` will match `stats` as a parameter.

**Expected Response `200`:**
```json
{
  "success": true,
  "data": {
    "total": 5,
    "completed": 2,
    "pending": 2,
    "inProgress": 1
  }
}
```

---

### GET `/api/todos/:id`
Get a single todo by ID.

**URL:** `{{base_url}}/api/todos/<todo-id>`

**Expected Response `200`:**
```json
{
  "success": true,
  "data": { "id": "...", "title": "...", ... }
}
```

---

### PATCH `/api/todos/:id`
Update a todo (all fields optional).

**URL:** `{{base_url}}/api/todos/<todo-id>`

**Body (raw JSON):**
```json
{
  "title": "Buy groceries (updated)",
  "status": "IN_PROGRESS",
  "isCompleted": false
}
```

**Valid `status` values:** `PENDING` | `IN_PROGRESS` | `COMPLETED` | `CANCELLED`

**Expected Response `200`:**
```json
{
  "success": true,
  "data": { "id": "...", "title": "Buy groceries (updated)", "status": "IN_PROGRESS", ... }
}
```

---

### DELETE `/api/todos/:id`
Delete a todo.

**URL:** `{{base_url}}/api/todos/<todo-id>`

**Expected Response `200`:**
```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

---

## 👑 Admin Endpoints (`/api/admin`)

> 🔒 Requires: `Authorization: Bearer {{access_token}}` where the account has **ADMIN** role.
>
> Use the seeded admin account to log in first:
> - **Email:** `admin@todoapp.com`
> - **Password:** `Admin@123`

**Headers for all Admin requests:**
```
Authorization: Bearer {{access_token}}
```

---

### GET `/api/admin/users`
List all registered users.

**Expected Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "email": "admin@todoapp.com",
      "name": "Super Admin",
      "role": "ADMIN",
      "emailVerified": "...",
      "createdAt": "..."
    },
    {
      "id": "...",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      ...
    }
  ]
}
```

---

### GET `/api/admin/users/:id`
Get a single user by their ID.

**URL:** `{{base_url}}/api/admin/users/<user-id>`

**Expected Response `200`:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "emailVerified": "...",
    "createdAt": "..."
  }
}
```

---

### DELETE `/api/admin/users/:id`
Permanently delete a user and all their data (todos, tokens — cascaded by DB).

**URL:** `{{base_url}}/api/admin/users/<user-id>`

**Expected Response `200`:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

> ⚠️ This is irreversible. All todos and tokens for that user are cascade-deleted.

---

### GET `/api/admin/todos`
List **all todos** across all users (includes user info).

**Expected Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "Buy groceries",
      "status": "PENDING",
      "user": {
        "id": "...",
        "email": "user@example.com",
        "name": "John Doe"
      },
      ...
    }
  ]
}
```

---

## ❌ Error Responses

All errors follow the same shape:

```json
{
  "success": false,
  "statusCode": 401,
  "message": "Missing or invalid authorization header"
}
```

| Status | Meaning                              |
|--------|--------------------------------------|
| `400`  | Validation failed / Bad request      |
| `401`  | Missing or invalid token             |
| `403`  | Authenticated but not ADMIN role     |
| `404`  | Resource not found                   |
| `409`  | Conflict (e.g. email already exists) |
| `500`  | Unexpected server error              |

---

## 🚀 Recommended Testing Flow

```
1. POST /api/auth/signup          → register a regular user
2. GET  /api/auth/verify-email    → verify the email
3. POST /api/auth/login           → login as regular user, save tokens
4. POST /api/todos                → create a few todos
5. GET  /api/todos                → list todos
6. GET  /api/todos/stats          → view stats
7. PATCH /api/todos/:id           → update a todo status
8. DELETE /api/todos/:id          → delete a todo
9. POST /api/auth/logout          → logout

--- Admin Flow ---
10. POST /api/auth/login          → login as admin@todoapp.com / Admin@123
11. GET  /api/admin/users         → see all users
12. GET  /api/admin/todos         → see all todos across all users
13. GET  /api/admin/users/:id     → inspect a specific user
14. DELETE /api/admin/users/:id   → delete a user (careful!)
```
