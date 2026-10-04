import React, { useState } from 'react';
import { Star } from 'lucide-react';

const ratingLabels = {
  1: 'Poor (1/5)',
  2: 'Fair (2/5)',
  3: 'Good (3/5)',
  4: 'Very Good (4/5)',
  5: 'Excellent (5/5)',
};

const RatingSelector = ({ value, onChange, error }) => {
  const [hoverValue, setHoverValue] = useState(0);

  const displayValue = hoverValue || value;

  const handleKeyDown = (event, starNumber) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onChange(starNumber);
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (value < 5) onChange(value + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (value > 1) onChange(value - 1);
    }
  };

  return (
    <div>
      <div
        className="flex items-center gap-1.5"
        role="radiogroup"
        aria-label="Rating out of 5 stars"
        onMouseLeave={() => setHoverValue(0)}
      >
        {[1, 2, 3, 4, 5].map((starNumber) => {
          const isFilled = starNumber <= displayValue;
          const isCurrentSelected = starNumber === value;

          return (
            <button
              key={starNumber}
              type="button"
              role="radio"
              aria-checked={isCurrentSelected}
              aria-label={`${starNumber} star${starNumber > 1 ? 's' : ''}`}
              tabIndex={0}
              onClick={() => onChange(starNumber)}
              onMouseEnter={() => setHoverValue(starNumber)}
              onKeyDown={(e) => handleKeyDown(e, starNumber)}
              className={`p-1.5 rounded transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                isFilled ? 'text-amber-400' : 'text-slate-300'
              }`}
            >
              <Star
                className="w-7 h-7"
                fill={isFilled ? 'currentColor' : 'none'}
                strokeWidth={1.75}
              />
            </button>
          );
        })}

        {displayValue > 0 && (
          <span className="ml-2 text-sm font-medium text-slate-700">
            {ratingLabels[displayValue]}
          </span>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-rose-600 font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default RatingSelector;
