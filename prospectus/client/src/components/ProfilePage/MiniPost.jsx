import React from "react";
import { formatDistance } from "date-fns";
import { Heart, MessageCircle } from "lucide-react";
import {
  tags,
  getAverageRating,
  getStars,
  allProfiles,
  allReviews,
} from "../../utility.jsx";
import { useNavigate } from "react-router-dom";

export default function MiniPost({ post, notOwner }) {
  const reviews = post.reviewIDs.map((reviewID) => allReviews[reviewID]);
  const otherProfile = allProfiles[post.profileID]; // only needed if notOwner
  const navigate = useNavigate();

  return (
    <div
      className="w-11/12 mx-auto max-h-64 border-2 p-2 rounded-lg cursor-pointer"
      onClick={() => navigate(`/post/${post.id}`)}
    >
      {notOwner && (
        <div className="flex items-center gap-2">
          <div
            className="avatar cursor-pointer"
            onClick={() => navigate(`/profile/${otherProfile.username}`)}
          >
            <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2 m-2">
              <img src={otherProfile.avatar} />
            </div>
          </div>
          <div className="text-gray-500">
            {otherProfile.name}
            <br />@{otherProfile.username}
          </div>
        </div>
      )}
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
