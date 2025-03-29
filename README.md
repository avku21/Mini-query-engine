# Mini Data Query Simulation Engine 🚗🔍

![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg)
![Express](https://img.shields.io/badge/Express-4.x-000000.svg)
![JWT](https://img.shields.io/badge/JWT-Auth-000000.svg)

A lightweight Node.js backend service that simulates an AI-powered car database query system with natural language processing capabilities.

## Features ✨

- Natural language to mock SQL translation
- Car database query endpoints
- JWT authentication system
- Query explanation and validation
- In-memory car database
- Comprehensive error handling

## Quick Start 🏁

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/car-query-engine.git
cd car-query-engine
npm install

# Project Title

A brief description of what this project does and who it's for

# API Documentation

## Base URL

```
http://localhost:5001/api
```

## Authentication

This API uses Bearer Token authentication. Include the token in the `Authorization` header:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## Endpoints

### 1. Get Users

#### Request:

```http
GET /auth/users
```

#### Headers:

```json
{
    "Authorization": "Bearer YOUR_ACCESS_TOKEN",
    "Content-Type": "application/json"
}
```

#### Response:

- **200 OK**: Returns a list of users.

---

### 2. User Signup

#### Request:

```http
POST /auth/signup
```

#### Headers:

```json
{
    "Content-Type": "application/json"
}
```

#### Body:

```json
{
    "name": "Avinash",
    "email": "xyz@gmail.com",
    "password": "12345678"
}
```

#### Response:

- **201 Created**: User registered successfully.

---

### 3. User Login

#### Request:

```http
POST /auth/login
```

#### Headers:

```json
{
    "Content-Type": "application/json"
}
```

#### Body:

```json
{
    "name": "Avinash",
    "email": "xyz@gmail.com",
    "password": "12345678"
}
```

#### Response:

- **200 OK**: Returns an authentication token.

---

### 4. Query Processing

#### Request:

```http
POST /query
```

#### Headers:

```json
{
    "Authorization": "Bearer YOUR_ACCESS_TOKEN",
    "Content-Type": "application/json"
}
```

#### Body:

```json
{
    "query": "Give me all the cars launched in 2021"
}
```

#### Response:

- **200 OK**: Returns query results.

---

### 5. Explanation Request

#### Request:

```http
POST /explain
```

#### Headers:

```json
{
    "Authorization": "Bearer YOUR_ACCESS_TOKEN",
    "Content-Type": "application/json"
}
```

#### Body:

```json
{
    "query": "Give me all the cars launched in 2021"
}
```

#### Response:

- **200 OK**: Returns an explanation of the query results.

---

### 6. Query Validation

#### Request:

```http
POST /validate
```

#### Headers:

```json
{
    "Authorization": "Bearer YOUR_ACCESS_TOKEN",
    "Content-Type": "application/json"
}
```

#### Body:

```json
{
    "query": "Give me all the cars launched in 2021"
}
```

#### Response:

- **200 OK**: Validates and returns the processed query.

---

## Notes

- Ensure that you replace `YOUR_ACCESS_TOKEN` with a valid JWT token.
- The API should be accessed via `http://localhost:5001/api/` unless deployed otherwise.
- Authentication is required for certain endpoints.

For any issues, please raise a GitHub issue in the repository.



