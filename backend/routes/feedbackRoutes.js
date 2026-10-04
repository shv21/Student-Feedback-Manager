const express = require('express');
const router = express.Router();
const {
  createFeedback,
  getAllFeedback,
} = require('../controllers/feedbackController');

// Route: /api/feedback
router.route('/')
  .post(createFeedback)
  .get(getAllFeedback);

module.exports = router;
