import React from "react";
import { formatDistance } from "date-fns";
import { Heart, MessageCircle } from "lucide-react";
import {
  tags,
  getAverageRating,
  getStars,
  allReviews,
} from "../../utility.jsx";

export default function MiniPost({ post }) {
  const reviews = post.reviewIDs.map((reviewID) => allReviews[reviewID]);

  return (
    <div className="w-11/12 mx-auto max-h-64 border-2 p-2 rounded-lg cursor-pointer">
      <p className="p-2 text-3xl">{post.title}</p>
      <div className="flex gap-2 p-2">
        {post.tags.map((tag) => (
          <div className={`rounded-lg p-1.5 ${tags[tag]}`}>{tag}</div>
        ))}
      </div>
      <p className="p-2">{post.text}</p>
      <div className="flex justify-between items-center p-2">
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 items-center">
            <Heart />
            {post.likes}
          </div>
          <div className="flex gap-1 items-center">
            <MessageCircle />
            {reviews.length}
          </div>
          <div className="flex gap-1 items-center">
            {getStars(reviews, 24)}
            {getAverageRating(reviews)}
          </div>
        </div>
        <div
          className="tooltip tooltip-primary tooltip-bottom"
          data-tip={post.time.toLocaleString()}
        >
          {formatDistance(post.time, Date(), { addSuffix: true })}
        </div>
      </div>
    </div>
  );
}
