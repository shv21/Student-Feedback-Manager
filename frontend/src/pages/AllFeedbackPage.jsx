import React, { useState, useEffect, useCallback } from 'react';
import { RotateCw, MessageSquare } from 'lucide-react';
import { getFeedback } from '../services/feedbackService';
import FeedbackList from '../components/FeedbackList';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

const AllFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeedbackList = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getFeedback();
      setFeedbacks(data);
    } catch (err) {
      setError(err.message || 'Unable to load feedback. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedbackList();
  }, [fetchFeedbackList]);

  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Student Feedback
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            See what students have shared about their learning experience.
          </p>
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={fetchFeedbackList}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed self-start sm:self-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          title="Refresh feedback entries"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Content States */}
      {isLoading ? (
        <LoadingState message="Loading feedback..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchFeedbackList} />
      ) : feedbacks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="flex items-center gap-1.5 font-medium">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              Showing {feedbacks.length} {feedbacks.length === 1 ? 'submission' : 'submissions'}
            </span>
            <span>Sorted by newest first</span>
          </div>

          <FeedbackList feedbacks={feedbacks} />
        </div>
      )}
    </div>
  );
};

export default AllFeedbackPage;
