# TradeFlow API Platform

TradeFlow is a complete production-ready full-stack application built for managing products with role-based access control.

## 🚀 Features

- **Authentication System**: Secure JWT-based registration and login.
- **Role-Based Access Control**: Differentiates between regular `user` and `admin`.
- **Product Management**: Full CRUD operations for products (Admins only for Write operations).
- **Search & Filtering**: Built-in API features for filtering, sorting, pagination, and searching products.
- **Security**: Hardened with Helmet, CORS, and robust validation using Express-Validator. MongoDB Injection and XSS protection.
- **Modern UI**: A responsive, premium dashboard built with React (Vite) and Tailwind CSS.

## 📁 Folder Structure

```
.
├── backend/                  # Node.js Express Server
│   ├── src/
│   │   ├── config/           # Database and Swagger configs
│   │   ├── controllers/      # Route controllers (Auth, Products, Users)
│   │   ├── middlewares/      # Custom middlewares (Auth, Role, Error, Validation)
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # Express routes
│   │   ├── utils/            # Utilities (CatchAsync, APIFeatures)
│   │   ├── app.js            # Express app configuration
│   │   └── server.js         # Entry point
│   ├── .env                  # Environment variables
│   └── package.json
└── frontend/                 # React Vite Application
    ├── src/
    │   ├── components/       # Shared UI components
    │   ├── context/          # React Context (Auth)
    │   ├── pages/            # Page components (Login, Dashboard, Products)
    │   ├── services/         # API Service (Axios interceptors)
    │   ├── App.jsx           # Main App routing
    │   └── main.jsx          # React entry point
    ├── tailwind.config.js    # Tailwind configuration
    └── package.json
```

## 🛠️ Installation

1. **Clone the repository** (if applicable) or download the files.
2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```
3. **Install Frontend Dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tradeflow
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=30d
NODE_ENV=development
```

## 🚦 Running the Application

**Start the Backend (Development Mode):**
```bash
cd backend
npm run dev
```

**Start the Frontend:**
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`.
The backend will be available at `http://localhost:5000`.

## 📚 API Documentation

Complete Swagger API documentation is available. Once the backend server is running, navigate to:

```
http://localhost:5000/api-docs
```

## 🚀 Deployment

- **Backend (Render / Railway / Heroku)**: Set the start script to `node src/server.js`. Ensure you add all environment variables to the hosting provider's dashboard.
- **Frontend (Vercel / Netlify)**: Use the build command `npm run build` and output directory `dist`. Remember to update the `baseURL` in `frontend/src/services/api.js` to point to your live backend API.
- **Database (MongoDB Atlas)**: Update `MONGODB_URI` to use your cloud cluster string.

## 🔮 Future Improvements
- Implement Redis Caching for products.
- Add Refresh Token rotation.
- Dockerize the application for easier deployments.
- Write unit tests using Jest and Supertest.
