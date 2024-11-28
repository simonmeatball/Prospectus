import React from "react";
import { Star } from "lucide-react";
import { formatDistance } from "date-fns";

export default function MiniReview({ review }) {
  return (
    <div className="w-11/12 mx-auto flex justify-end">
      <div className="max-h-64 w-[95%] border-2 p-2 rounded-lg">
        <div className="flex justify-between items-center p-2">
          <div className="flex gap-1">
            {Array.from({ length: review.rating }, () => (
              <Star fill="#000000" />
            ))}
            {Array.from({ length: 5 - review.rating }, () => (
              <Star absoluteStrokeWidth strokeWidth={2} />
            ))}
          </div>
          <div
            className="tooltip tooltip-primary tooltip-bottom"
            data-tip={review.time.toLocaleString()}
          >
            {formatDistance(review.time, Date(), { addSuffix: true })}
          </div>
        </div>
        <p className="p-2">{review.text}</p>
      </div>
    </div>
  );
}
