import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquareDashed, PlusCircle } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="bg-white rounded-lg border border-dashed border-slate-300 p-10 sm:p-12 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-3">
        <MessageSquareDashed className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-800 mb-1">
        No feedback yet.
      </h3>
      <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
        Be the first student to share your thoughts, suggestions, and learning experience!
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
      >
        <PlusCircle className="w-4 h-4" />
        <span>Share Feedback</span>
      </Link>
    </div>
  );
};

export default EmptyState;
