const mongoose = require('mongoose');

/**
 * Connects to MongoDB database using Mongoose.
 * Connection string is securely loaded from environment variables (process.env.MONGO_URI).
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student_feedback_db';

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`⚠️ MongoDB Connection Error: ${error.message}`);
    console.error('👉 Troubleshooting tips:');
    console.error('   1. If using local MongoDB, ensure MongoDB is installed and running (run "mongod" or start the Windows MongoDB service).');
    console.error('   2. If using MongoDB Atlas, verify your connection string in backend/.env (process.env.MONGO_URI) and whitelist your IP.');
  }
};

module.exports = connectDB;
