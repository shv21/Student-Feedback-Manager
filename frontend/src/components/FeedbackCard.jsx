import React from 'react';
import { Star, Calendar, User } from 'lucide-react';

const FeedbackCard = ({ feedback }) => {
  const { name, rating, comment, createdAt } = feedback;

  // Format the submission date nicely (e.g., "Oct 4, 2026")
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Recent';
    }
  };

  return (
    <article className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-sm hover:border-slate-300 transition-colors">
      {/* Header: Student Name and Rating */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-semibold text-xs flex-shrink-0">
            {name ? name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-base leading-snug">
              {name}
            </h3>
          </div>
        </div>

        {/* Rating Stars */}
        <div
          className="flex items-center gap-1"
          aria-label={`Rating: ${rating} out of 5 stars`}
        >
          {[1, 2, 3, 4, 5].map((starNumber) => {
            const isFilled = starNumber <= rating;
            return (
              <Star
                key={starNumber}
                className={`w-4 h-4 ${
                  isFilled ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                }`}
              />
            );
          })}
          <span className="ml-1 text-xs font-semibold text-slate-600">
            {rating}/5
          </span>
        </div>
      </div>

      {/* Feedback Comment */}
      <div className="py-4">
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line italic">
          "{comment}"
        </p>
      </div>

      {/* Footer: Submission Date */}
      <div className="pt-2 text-xs text-slate-400 flex items-center gap-1.5 border-t border-slate-50">
        <Calendar className="w-3.5 h-3.5" />
        <span>Submitted on {formatDate(createdAt)}</span>
      </div>
    </article>
  );
};

export default FeedbackCard;
