import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { allProfiles } from "../generate";

export default function ProfilePage() {
  const { username } = useParams();
  const profile = allProfiles.find((profile) => profile.username === username);
  const [view, setView] = useState("posts");

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="avatar mb-4">
          <div className="ring-primary ring-offset-base-100 w-48 rounded-full ring ring-offset-2">
            <img src={profile.avatar} />
          </div>
        </div>
        <p className="text-3xl">{profile.name}</p>
        <p className="text-gray-500 text-lg mb-4">@{profile.username}</p>
        <div className="flex gap-4">
          <button className="btn" onClick={() => setView("posts")}>
            Posts
          </button>
          <button className="btn" onClick={() => setView("reviews")}>
            Reviews
          </button>
        </div>
        {view === "posts" && <div>Posts</div>}
        {view === "reviews" && <div>Reviews</div>}
      </div>
    </div>
  );
}
