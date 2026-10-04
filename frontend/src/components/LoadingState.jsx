import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = ({ message = 'Loading feedback...' }) => {
  return (
    <div
      className="bg-white rounded-lg border border-slate-200 p-12 text-center shadow-sm"
      role="status"
      aria-live="polite"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-50 text-brand-600 mb-3">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
      <p className="text-slate-600 text-sm font-medium">{message}</p>
    </div>
  );
};

export default LoadingState;
