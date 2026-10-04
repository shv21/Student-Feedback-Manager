import React from 'react';
import FeedbackForm from '../components/FeedbackForm';

const HomePage = () => {
  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Page Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Share Your Feedback
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Your feedback helps us understand your learning experience and improve it.
        </p>
      </div>

      {/* Main Feedback Form Card */}
      <FeedbackForm />
    </div>
  );
};

export default HomePage;
