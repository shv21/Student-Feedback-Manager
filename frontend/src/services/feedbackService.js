/**
 * Feedback Service
 * Centralizes all HTTP communication with the backend API using the browser Fetch API.
 */

// Base URL: either from environment variable or proxy fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Fetch all feedback entries from the backend.
 * @returns {Promise<Array>} Array of feedback objects sorted by newest first
 */
export const getFeedback = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Server responded with status ${response.status}`);
    }

    // Return the array of feedback documents
    return data.data || [];
  } catch (error) {
    console.error('getFeedback error:', error);
    throw error;
  }
};

/**
 * Submit new feedback to the backend.
 * @param {Object} feedbackData - { name: string, rating: number, comment: string }
 * @returns {Promise<Object>} The created feedback object from the server
 */
export const createFeedback = async (feedbackData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit feedback.');
    }

    return data;
  } catch (error) {
    console.error('createFeedback error:', error);
    throw error;
  }
};
