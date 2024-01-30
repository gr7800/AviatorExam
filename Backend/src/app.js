// Load environment variables from .env file
require('dotenv').config();

// Import required packages
const express = require('express');
const connect = require('./config/db');
const cors = require('cors');



// Set port number
const PORT = process.env.PORT || 8080;

// Create an instance of express
const app = express();

// Import routes
const examRoutes = require('./Operations/Exam/Exam.route');
const paymentRoutes = require("./Operations/Payment/PaymentRoute.js")
const userRoutes = require("./Operations/User/User.route.js")

// Import middleware for protecting routes
const authenticationMiddleware = require('./Middleware/Authentication.Middleware');

// Enable CORS for all origins
app.use(cors({ origin: true, credentials: true }));

// Parse JSON request bodies
app.use(express.json());

// Routes
app.use("/api",userRoutes)
app.use('/api',paymentRoutes);
app.use('/api', examRoutes);
app.use(authenticationMiddleware); // Middleware for protecting routes

// Connect to the database and start the server
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
