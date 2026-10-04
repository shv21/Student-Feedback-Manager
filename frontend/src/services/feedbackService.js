/**
 * Feedback Service
 * Centralizes all HTTP communication with the backend API using the browser Fetch API.
 */

// Live production backend on Render
const PRODUCTION_API_URL = 'https://student-feedback-manager-x4hy.onrender.com/api';

/**
 * Resolve the API base URL cleanly:
 * - Uses VITE_API_URL from environment if defined
 * - In production mode, defaults to the live Render backend URL
 * - In development mode, defaults to '/api' (proxied by Vite to localhost:5000)
 * - Normalizes trailing slashes and ensures '/api' suffix is present
 */
const getApiBaseUrl = () => {
  let url = import.meta.env.VITE_API_URL;
  if (!url || url.trim() === '') {
    return import.meta.env.PROD ? PRODUCTION_API_URL : '/api';
  }
  url = url.trim().replace(/\/+$/, '');
  if (url.startsWith('http') && !url.endsWith('/api')) {
    url = `${url}/api`;
  }
  return url;
};

const API_BASE_URL = getApiBaseUrl();

/**
 * Helper to safely extract response body (JSON or text)
 */
const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch {
      return {};
    }
  }
  const text = await response.text();
  return { message: text };
};

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

    const data = await parseResponse(response);

    if (!response.ok) {
      throw new Error(data.message || `Server responded with status ${response.status}`);
    }

    // Return the array of feedback documents
    return data.data || [];
  } catch (error) {
    console.error('getFeedback error:', error);
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the backend server. The server may be waking up (free tier spins down after idle). Please wait a moment and try again.');
    }
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

    const data = await parseResponse(response);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit feedback.');
    }

    return data;
  } catch (error) {
    console.error('createFeedback error:', error);
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the backend server. The server may be waking up (free tier spins down after idle). Please wait a moment and try again.');
    }
    throw error;
  }
};
