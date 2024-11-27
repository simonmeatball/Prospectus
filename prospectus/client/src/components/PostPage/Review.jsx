import React from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { formatDistance } from "date-fns";
import { allProfiles } from "../../generate";

export default function Review({ review }) {
  const navigate = useNavigate();
  const profile = allProfiles[review.profileID];

  return (
    <div className="w-64 h-auto border-2 p-2 rounded-lg">
      <div className="flex gap-1 p-2">
        {Array.from({ length: review.rating }, () => (
          <Star fill="#000000" />
        ))}
        {Array.from({ length: 5 - review.rating }, () => (
          <Star strokeWidth={1} />
        ))}
      </div>
      <p className="p-2">{review.text}</p>
      <div className="flex gap-2 items-center">
        <div
          className="avatar cursor-pointer"
          onClick={() => navigate(`/profile/${profile.username}`)}
        >
          <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2 m-2">
            <img src={profile.avatar} />
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {profile.name}
          <br />
          <div
            className="tooltip tooltip-primary tooltip-bottom"
            data-tip={review.time.toLocaleString()}
          >
            {formatDistance(review.time, Date(), { addSuffix: true })}
          </div>
        </div>
      </div>
    </div>
  );
}
