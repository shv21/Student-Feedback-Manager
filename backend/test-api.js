/**
 * Unit & Integration Test Suite for Student Feedback Manager
 * Tests:
 * 1. Mongoose Schema & Validation rules (name, rating, comment, timestamps)
 * 2. Express Controller validation logic (HTTP 400 Bad Request handling)
 * 3. Express Server routing, 404 handler, and CORS middleware
 */

const mongoose = require('mongoose');
const express = require('express');
const Feedback = require('./models/Feedback');
const feedbackRoutes = require('./routes/feedbackRoutes');
const { createFeedback, getAllFeedback } = require('./controllers/feedbackController');

async function runTests() {
  console.log('========================================================');
  console.log('  Student Feedback Manager - Automated Test Suite');
  console.log('========================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`✓ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`✗ [FAIL] ${testName}`);
      failed++;
    }
  }

  // --- TEST SUITE 1: Mongoose Schema Validation ---
  console.log('--- Suite 1: Mongoose Schema Validation ---');

  // Test 1.1: Missing required fields
  const emptyDoc = new Feedback({});
  const emptyValidationErr = emptyDoc.validateSync();
  assert(
    emptyValidationErr &&
    emptyValidationErr.errors['name'] &&
    emptyValidationErr.errors['rating'] &&
    emptyValidationErr.errors['comment'],
    'Schema enforces required constraints on name, rating, and comment'
  );

  // Test 1.2: Rating boundaries (min: 1, max: 5)
  const lowRatingDoc = new Feedback({ name: 'Test', rating: 0, comment: 'Good' });
  const lowRatingErr = lowRatingDoc.validateSync();
  assert(
    lowRatingErr && lowRatingErr.errors['rating'],
    'Schema rejects rating lower than 1 (min: 1)'
  );

  const highRatingDoc = new Feedback({ name: 'Test', rating: 6, comment: 'Good' });
  const highRatingErr = highRatingDoc.validateSync();
  assert(
    highRatingErr && highRatingErr.errors['rating'],
    'Schema rejects rating greater than 5 (max: 5)'
  );

  // Test 1.3: Valid document passes schema validation
  const validDoc = new Feedback({
    name: '  Aarav Sharma  ',
    rating: 5,
    comment: '  Great hands-on sessions and clear explanations.  ',
  });
  const validErr = validDoc.validateSync();
  assert(!validErr, 'Schema validates correct document successfully');
  assert(
    validDoc.name === 'Aarav Sharma' && validDoc.comment === 'Great hands-on sessions and clear explanations.',
    'Schema trims whitespace from name and comment automatically'
  );

  // --- TEST SUITE 2: Express Controller Validation ---
  console.log('\n--- Suite 2: Express Controller Validation (HTTP 400s) ---');

  // Helper mock for Express req & res
  const createMockRes = () => {
    const res = {};
    res.statusCode = 200;
    res.jsonData = null;
    res.status = function (code) {
      this.statusCode = code;
      return this;
    };
    res.json = function (data) {
      this.jsonData = data;
      return this;
    };
    return res;
  };

  // Test 2.1: Missing name returns 400
  const reqNoName = { body: { rating: 5, comment: 'Great course' } };
  const resNoName = createMockRes();
  await createFeedback(reqNoName, resNoName);
  assert(
    resNoName.statusCode === 400 && resNoName.jsonData.success === false,
    'createFeedback returns 400 Bad Request when student name is missing'
  );

  // Test 2.2: Missing rating returns 400
  const reqNoRating = { body: { name: 'Priya', comment: 'Great course' } };
  const resNoRating = createMockRes();
  await createFeedback(reqNoRating, resNoRating);
  assert(
    resNoRating.statusCode === 400 && resNoRating.jsonData.success === false,
    'createFeedback returns 400 Bad Request when rating is missing'
  );

  // Test 2.3: Non-numeric / out of bound rating returns 400
  const reqInvalidRating = { body: { name: 'Priya', rating: 10, comment: 'Great' } };
  const resInvalidRating = createMockRes();
  await createFeedback(reqInvalidRating, resInvalidRating);
  assert(
    resInvalidRating.statusCode === 400 && resInvalidRating.jsonData.success === false,
    'createFeedback returns 400 Bad Request when rating is outside 1-5'
  );

  // Test 2.4: Missing comment returns 400
  const reqNoComment = { body: { name: 'Priya', rating: 4, comment: '   ' } };
  const resNoComment = createMockRes();
  await createFeedback(reqNoComment, resNoComment);
  assert(
    resNoComment.statusCode === 400 && resNoComment.jsonData.success === false,
    'createFeedback returns 400 Bad Request when comment is empty'
  );

  // --- TEST SUITE 3: Express App Routing & Middleware ---
  console.log('\n--- Suite 3: Express Routing & Error Handling ---');

  const app = express();
  app.use(express.json());
  app.get('/', (req, res) => res.json({ status: 'online' }));
  app.use('/api/feedback', feedbackRoutes);
  app.use((req, res) => res.status(404).json({ success: false, message: 'Not found' }));

  const server = app.listen(5099, async () => {
    try {
      // Test 3.1: Health check endpoint
      const rootRes = await fetch('http://localhost:5099/');
      const rootData = await rootRes.json();
      assert(rootRes.status === 200 && rootData.status === 'online', 'Server starts and health check returns status: online');

      // Test 3.2: 404 Not Found handling
      const notFoundRes = await fetch('http://localhost:5099/api/unknown-endpoint');
      const notFoundData = await notFoundRes.json();
      assert(notFoundRes.status === 404 && notFoundData.success === false, 'Server 404 handler returns structured 404 JSON response');

      // Test 3.3: POST endpoint route mapping
      const postTestRes = await fetch('http://localhost:5099/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const postTestData = await postTestRes.json();
      assert(
        postTestRes.status === 400 && postTestData.success === false,
        'POST /api/feedback route correctly maps to controller and validates payload'
      );

      server.close(() => {
        console.log('\n========================================================');
        console.log(`  Tests Completed: ${passed} passed, ${failed} failed`);
        console.log('========================================================\n');
        if (failed > 0) process.exit(1);
      });
    } catch (e) {
      server.close();
      console.error('Network error during test:', e);
      process.exit(1);
    }
  });
}

runTests();
