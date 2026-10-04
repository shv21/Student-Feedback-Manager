import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import RatingSelector from './RatingSelector';
import { createFeedback } from '../services/feedbackService';

const MAX_COMMENT_LENGTH = 500;
const MAX_NAME_LENGTH = 60;

const FeedbackForm = ({ onFeedbackSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    comment: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  // Handle rating change
  const handleRatingChange = (newRating) => {
    setFormData((prev) => ({ ...prev, rating: newRating }));
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: '' }));
    }
    if (serverError) setServerError('');
  };

  // Client-side validation
  const validate = () => {
    const newErrors = {};

    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = 'Please enter your name.';
    } else if (trimmedName.length > MAX_NAME_LENGTH) {
      newErrors.name = `Name cannot exceed ${MAX_NAME_LENGTH} characters.`;
    }

    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Please select a rating between 1 and 5 stars.';
    }

    const trimmedComment = formData.comment.trim();
    if (!trimmedComment) {
      newErrors.comment = 'Please provide your feedback comments.';
    } else if (trimmedComment.length > MAX_COMMENT_LENGTH) {
      newErrors.comment = `Feedback cannot exceed ${MAX_COMMENT_LENGTH} characters.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSubmitSuccess(false);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createFeedback({
        name: formData.name.trim(),
        rating: formData.rating,
        comment: formData.comment.trim(),
      });

      // Clear the form
      setFormData({
        name: '',
        rating: 0,
        comment: '',
      });
      setErrors({});
      setSubmitSuccess(true);

      if (onFeedbackSubmitted) {
        onFeedbackSubmitted();
      }
    } catch (err) {
      setServerError(
        err.message || 'Something went wrong while submitting your feedback.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-8">
      {/* Success Notification Banner */}
      {submitSuccess && (
        <div
          className="mb-6 p-4 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-900"
          role="status"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-sm">Feedback submitted successfully.</p>
              <p className="text-xs text-emerald-800 mt-1">
                Thank you! Your feedback has been recorded in the database.
              </p>
              <div className="mt-3">
                <Link
                  to="/feedback"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline hover:no-underline"
                >
                  <span>View All Feedback</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Server Error Banner */}
      {serverError && (
        <div
          className="mb-6 p-4 rounded-md bg-rose-50 border border-rose-200 text-rose-900"
          role="alert"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-sm">Submission Error</p>
              <p className="text-xs text-rose-800 mt-0.5">{serverError}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Student Name Field */}
        <div>
          <label
            htmlFor="student-name"
            className="block text-sm font-semibold text-slate-800 mb-1"
          >
            Student Name <span className="text-rose-600">*</span>
          </label>
          <input
            id="student-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            maxLength={MAX_NAME_LENGTH}
            placeholder="e.g. Aarav Sharma"
            className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-slate-900 placeholder-slate-400 transition-colors focus:bg-white ${
              errors.name
                ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                : 'border-slate-300 bg-white hover:border-slate-400 focus:border-brand-600 focus:ring-1 focus:ring-brand-600'
            }`}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-rose-600 font-medium" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Rating Field */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Rating <span className="text-rose-600">*</span>
          </label>
          <RatingSelector
            value={formData.rating}
            onChange={handleRatingChange}
            error={errors.rating}
          />
        </div>

        {/* Feedback / Comment Field */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="student-comment"
              className="block text-sm font-semibold text-slate-800"
            >
              Feedback <span className="text-rose-600">*</span>
            </label>
            <span
              className={`text-xs ${
                formData.comment.length > MAX_COMMENT_LENGTH - 30
                  ? 'text-amber-600 font-medium'
                  : 'text-slate-400'
              }`}
            >
              {formData.comment.length} / {MAX_COMMENT_LENGTH}
            </span>
          </div>
          <textarea
            id="student-comment"
            name="comment"
            rows={4}
            value={formData.comment}
            onChange={handleChange}
            maxLength={MAX_COMMENT_LENGTH}
            placeholder="Share your experience, what you enjoyed, and suggestions for improvement..."
            className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-slate-900 placeholder-slate-400 transition-colors focus:bg-white resize-y ${
              errors.comment
                ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                : 'border-slate-300 bg-white hover:border-slate-400 focus:border-brand-600 focus:ring-1 focus:ring-brand-600'
            }`}
            aria-invalid={errors.comment ? 'true' : 'false'}
            aria-describedby={errors.comment ? 'comment-error' : undefined}
          />
          {errors.comment && (
            <p id="comment-error" className="mt-1.5 text-xs text-rose-600 font-medium" role="alert">
              {errors.comment}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-medium text-sm transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-1 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Feedback</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
