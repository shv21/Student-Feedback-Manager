const mongoose = require('mongoose');

/**
 * Feedback Schema
 * Defines the structure, data types, and validation rules for student feedback.
 */
const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      maxlength: [60, 'Name cannot exceed 60 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    comment: {
      type: String,
      required: [true, 'Feedback comment is required'],
      trim: true,
      maxlength: [500, 'Feedback comment cannot exceed 500 characters'],
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Compile the schema into a Mongoose model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
