const Feedback = require('../models/Feedback');

/**
 * @desc    Submit new student feedback
 * @route   POST /api/feedback
 * @access  Public
 */
const createFeedback = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    // Field presence checks
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Student name is required.',
      });
    }

    if (rating === undefined || rating === null || rating === '') {
      return res.status(400).json({
        success: false,
        message: 'Rating is required.',
      });
    }

    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be a number between 1 and 5.',
      });
    }

    if (!comment || !comment.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Feedback comment is required.',
      });
    }

    // Create a new feedback document in MongoDB
    const feedback = await Feedback.create({
      name: name.trim(),
      rating: numericRating,
      comment: comment.trim(),
    });

    return res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully.',
      data: feedback,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    console.error('Error in createFeedback:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while saving feedback. Please try again.',
    });
  }
};

/**
 * @desc    Get all student feedback entries (newest first)
 * @route   GET /api/feedback
 * @access  Public
 */
const getAllFeedback = async (req, res) => {
  try {
    // Fetch all feedback documents from MongoDB, sorted by createdAt descending
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    console.error('Error in getAllFeedback:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while fetching feedback. Please try again.',
    });
  }
};

module.exports = {
  createFeedback,
  getAllFeedback,
};
