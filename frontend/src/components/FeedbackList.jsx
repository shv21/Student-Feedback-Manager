import React from 'react';
import FeedbackCard from './FeedbackCard';

const FeedbackList = ({ feedbacks = [] }) => {
  return (
    <div className="space-y-4">
      {feedbacks.map((item) => (
        <FeedbackCard key={item._id || item.id} feedback={item} />
      ))}
    </div>
  );
};

export default FeedbackList;
