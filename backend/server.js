const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const feedbackRoutes = require('./routes/feedbackRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express application
const app = express();

// Middleware: Enable Cross-Origin Resource Sharing (CORS) so React frontend can communicate with backend
app.use(cors());

// Middleware: Parse incoming JSON request bodies (express.json())
app.use(express.json());

// Basic health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Student Feedback Manager API is running smoothly.',
  });
});

// API Routes
app.use('/api/feedback', feedbackRoutes);

// 404 Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found.`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'An unexpected internal server error occurred.',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API Endpoints available at: http://localhost:${PORT}/api/feedback`);
});
