import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

const ErrorMessage = ({
  message = 'Unable to load feedback. Please try again.',
  onRetry,
}) => {
  return (
    <div
      className="bg-white rounded-lg border border-rose-200 p-8 text-center shadow-sm"
      role="alert"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 text-rose-600 mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1">
        Communication Error
      </h3>
      <p className="text-slate-600 text-sm max-w-md mx-auto mb-5">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
