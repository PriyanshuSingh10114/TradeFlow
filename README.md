<div align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=black" alt="Swagger" />
</div>

<h1 align="center">TradeFlow API Platform</h1>

<p align="center">
  A production-ready, highly scalable RESTful API and Frontend Dashboard engineered with the MERN stack. Designed to handle robust product management workflows with enterprise-grade security and Role-Based Access Control (RBAC).
</p>

---

## 📖 Overview

The TradeFlow API Platform solves the business problem of managing products securely within an organization. In many modern SaaS platforms, separating access privileges between standard users and system administrators is critical. 

This platform implements a secure **authentication and authorization** layer, ensuring that normal users can browse inventory while only verified administrators have the authority to manage (Create, Update, Delete) product entries. The underlying **API architecture** follows strict RESTful conventions, is versioned (`/api/v1/`), and relies on stateless JWT authentication to maximize scalability across distributed systems.

---

## ✨ Features

- [x] **User Registration & Login**: Secure onboarding with email validation.
- [x] **JWT Authentication**: Stateless and secure session management.
- [x] **Password Hashing**: Cryptographically secure bcrypt hashing.
- [x] **Role-Based Access Control (RBAC)**: Differentiated privileges for `user` and `admin` roles.
- [x] **Product CRUD Operations**: Full lifecycle management of products.
- [x] **Pagination**: Efficient data loading for large datasets.
- [x] **Search & Filtering**: Advanced query capabilities across multiple fields.
- [x] **Sorting**: Dynamic organization of API responses.
- [x] **API Versioning**: Future-proofed routing (`/api/v1/*`).
- [x] **Swagger Documentation**: Interactive API testing and exploration interface.
- [x] **Centralized Error Handling**: Standardized error responses across all endpoints.
- [x] **Input Validation**: Hardened endpoints using `express-validator`.
- [x] **Protected Routes**: Secure endpoints guarded by custom middleware.
- [x] **Responsive React Dashboard**: Modern, intuitive UI built with Tailwind CSS.
- [x] **Deployment Ready Architecture**: Designed for modern cloud environments.

---

## 🏗️ System Architecture

The application relies on a modern three-tier architecture ensuring complete separation of concerns:

```
[ Client (React + Tailwind) ]  <-- JSON/HTTP -->  [ API Server (Node + Express) ]  <-- Mongoose -->  [ Database (MongoDB Atlas) ]
```

1. **Frontend (Presentation Layer)**: Built with React, it manages the UI state and intercepts API requests to append Authorization tokens securely.
2. **Backend (Application Layer)**: Acts as the intermediary, validating inputs, enforcing RBAC, hashing credentials, and implementing business logic.
3. **Database (Data Layer)**: A NoSQL MongoDB cluster ensuring high availability, rapid reads/writes, and flexible document schemas.

---

## 📁 Folder Structure

```text
TradeFlow/
├── backend/                       # Node.js API Server
│   ├── src/
│   │   ├── config/                # DB Connection & Swagger Configs
│   │   ├── controllers/           # Core logic handling requests/responses
│   │   ├── middlewares/           # Auth, RBAC, Error, and Validation filters
│   │   ├── models/                # Mongoose Database Schemas
│   │   ├── routes/                # Express Route Definitions
│   │   ├── utils/                 # Utilities (CatchAsync, APIFeatures)
│   │   ├── app.js                 # Express Instance Setup
│   │   └── server.js              # Server Bootstrap
│   ├── .env                       # Environment Variables
│   └── package.json               # Backend Dependencies
└── frontend/                      # React SPA
    ├── src/
    │   ├── components/            # Reusable UI components (Navbar, Modals)
    │   ├── context/               # Global State (AuthContext)
    │   ├── pages/                 # View Components (Login, Dashboard, Products)
    │   ├── services/              # Axios Interceptors & API callers
    │   ├── App.jsx                # Router Configuration
    │   └── main.jsx               # React Mount Point
    ├── tailwind.config.js         # Tailwind v4 configuration
    └── package.json               # Frontend Dependencies
```

---

## 🗄️ Database Design

### User Schema
- `_id`: ObjectId (Primary Key)
- `name`: String (Required)
- `email`: String (Required, Unique, Indexed)
- `password`: String (Required, Hashed)
- `role`: String (Enum: `user`, `admin`, Default: `user`)
- `timestamps`: createdAt, updatedAt

### Product Schema
- `_id`: ObjectId (Primary Key)
- `title`: String (Required, Max 100 char)
- `description`: String (Required, Max 1000 char)
- `price`: Number (Required, Min 0)
- `category`: String (Required)
- `stock`: Number (Required, Min 0)
- `createdBy`: ObjectId (Foreign Key -> User._id)
- `timestamps`: createdAt, updatedAt

*Relationship*: A One-to-Many relationship exists where a single **User** (Admin) can be the creator of multiple **Products**.

---

## 📡 API Documentation

### Authentication APIs

| Method | Endpoint | Description | Auth Required |
| ------ | -------- | ----------- | ------------- |
| `POST` | `/api/v1/auth/register` | Register a new user | No |
| `POST` | `/api/v1/auth/login` | Authenticate user & get JWT | No |

### Products APIs

| Method | Endpoint | Description | Auth Required |
| ------ | -------- | ----------- | ------------- |
| `GET` | `/api/v1/products` | Retrieve all products (w/ search, filter, paginate) | Yes (User/Admin) |
| `GET` | `/api/v1/products/:id` | Get single product by ID | Yes (User/Admin) |
| `POST` | `/api/v1/products` | Create a new product | Yes (**Admin Only**) |
| `PUT` | `/api/v1/products/:id` | Update an existing product | Yes (**Admin Only**) |
| `DELETE`| `/api/v1/products/:id` | Delete a product | Yes (**Admin Only**) |

### Users APIs

| Method | Endpoint | Description | Auth Required |
| ------ | -------- | ----------- | ------------- |
| `GET` | `/api/v1/users` | Retrieve all users | Yes (**Admin Only**) |

---

## 🔐 Authentication Flow

1. **Registration**: User submits details -> Backend validates input -> `bcrypt` hashes password -> Record saved to DB -> JWT generated and returned.
2. **Login**: User submits credentials -> Backend matches email -> `bcrypt` compares hashed password -> JWT generated and returned.
3. **Protected Route Access**: Client intercepts request, appending `Bearer <token>` to Headers -> Backend `authMiddleware` verifies token -> Request proceeds.
4. **Logout**: Client flushes JWT from `localStorage` and resets Context state.

---

## 🛡️ Security Features

- **bcrypt password hashing**: Ensures passwords are never stored in plaintext, protecting against database breaches.
- **JWT authentication**: Stateless tokens prevent session hijacking.
- **express-validator**: Prevents malformed requests and validates incoming payloads strictly.
- **Helmet**: Secures Express apps by setting various HTTP headers (X-XSS-Protection, Strict-Transport-Security, etc.).
- **CORS**: Enforces Cross-Origin Resource Sharing policies to protect against unauthorized domains.
- **Input Sanitization & MongoDB Injection Prevention**: Stops NoSQL injection attacks by casting data properly and stripping operators.
- **Environment Variables**: Sensitive data is injected at runtime and never committed to version control.

---

## 📈 Scalability Considerations

- **Modular Architecture**: Layered design allows independent scaling of controllers, routes, and services.
- **Horizontal Scaling**: Stateless JWTs mean any server instance can handle any request behind a load balancer without sticky sessions.
- **Load Balancing**: Ready for Nginx or AWS ALB integration to distribute traffic.
- **Redis Caching Opportunities**: The GET `/api/v1/products` endpoint is perfectly suited for Redis caching to reduce database load.
- **Database Indexing**: The `email` field is indexed for rapid auth lookups, and compound indexes can be added to product categories/prices for faster filtering.
- **Microservices Migration Path**: The strict separation of `auth` and `products` domains makes it trivial to split this monolith into microservices in the future.

---

## 🚀 Installation Guide

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas URI)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see table below).
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

## ⚙️ Environment Variables

Create a `.env` file in the `/backend` directory.

| Variable | Description | Example |
| -------- | ----------- | ------- |
| `PORT` | The port the Express server will run on | `5000` |
| `MONGODB_URI` | MongoDB connection string (Local or Atlas) | `mongodb://localhost:27017/tradeflow` |
| `JWT_SECRET` | Cryptographic secret for signing JSON Web Tokens | `your_super_secret_key` |
| `JWT_EXPIRES_IN` | Lifespan of the generated JWT | `30d` |

---

## 🌐 Deployment Guide

1. **Frontend Deployment (Vercel)**:
   - Connect Vercel to your repository.
   - Set the root directory to `frontend`.
   - Build Command: `npm run build`
   - Output Directory: `dist`
2. **Backend Deployment (Render)**:
   - Create a Web Service on Render.
   - Set the root directory to `backend`.
   - Build Command: `npm install`
   - Start Command: `node src/server.js`
   - Add Environment Variables in the Render Dashboard.
3. **Database (MongoDB Atlas)**:
   - Create a free cluster on MongoDB Atlas.
   - Allow IP access from anywhere (`0.0.0.0/0`).
   - Copy the connection string into your Render Environment Variables.

---

## 🧪 API Testing

### Swagger UI
Once the backend is running, visit the interactive Swagger interface to test all endpoints:
```
http://localhost:5000/api-docs
```

### Postman
Import the endpoints into Postman. Ensure you attach the JWT token in the `Authorization` tab (Type: Bearer Token) for protected routes.

---

## 📸 Screenshots

*Placeholders for application screens. (Replace with real screenshots prior to submission).*

- **Login Page**: `![Login](placeholder.png)`
- **Register Page**: `![Register](placeholder.png)`
- **Dashboard**: `![Dashboard](placeholder.png)`
- **Products Page**: `![Products](placeholder.png)`
- **Swagger UI**: `![Swagger](placeholder.png)`

---

## 🔭 Future Enhancements

- **Refresh Tokens**: Implement short-lived access tokens and secure refresh token rotation.
- **Redis Caching**: Cache database-heavy read operations for sub-millisecond response times.
- **Docker**: Containerize both frontend and backend for seamless CI/CD.
- **CI/CD**: Automate testing and deployment pipelines using GitHub Actions.
- **Unit Testing**: Implement Jest and Supertest for comprehensive route testing.
- **Email Verification**: Ensure user emails are valid before account activation.
- **Multi-Factor Authentication**: Add TOTP for Admin accounts.
- **Audit Logs**: Track which admin modified or deleted specific products.

---

## ✅ Assignment Requirements Mapping

| Requirement | Status | Implemented Feature |
| ----------- | ------ | ------------------- |
| Node.js & Express Backend | 🟢 Done | Configured in `backend/` using modern ES Modules. |
| React & Tailwind Frontend | 🟢 Done | Built using Vite in `frontend/` with v4 Tailwind configurations. |
| MongoDB Atlas | 🟢 Done | Configured via Mongoose in `database.js`. |
| JWT Authentication | 🟢 Done | `generateToken` implemented in `authController.js`. |
| Role-Based Access Control | 🟢 Done | `authorizeRoles` middleware guards `POST/PUT/DELETE` products. |
| Product CRUD APIs | 🟢 Done | Controllers built; integrated with APIFeatures. |
| Swagger Documentation | 🟢 Done | Fully documented at `/api-docs`. |
| Error Handling & Validation | 🟢 Done | `express-validator` and centralized `errorMiddleware.js`. |
| Secure Password Hashing | 🟢 Done | `bcryptjs` hooks in `User.js` model. |
| Professional README | 🟢 Done | This document. |

---

## 👨‍💻 Author

**Priyanshu Singh**  
Backend Developer / Full Stack Engineer  
- GitHub: [PriyanshuSingh10114](https://github.com/PriyanshuSingh10114)
- LinkedIn: [Your LinkedIn Profile URL](https://linkedin.com/in/yourprofile)

---

## 🎯 Conclusion

The TradeFlow API Platform demonstrates a profound understanding of modern software engineering principles. By strictly adhering to REST conventions, securing endpoints with layered middleware (JWT & RBAC), and implementing robust validation, this application is highly secure and production-ready. Its modular architecture ensures it can scale horizontally, easily adapting to the demands of enterprise-level traffic and serving as a robust foundation for future microservice integrations.
