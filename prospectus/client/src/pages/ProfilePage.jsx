import React from "react";
import Navbar from "./Navbar";
import { generateProfile } from "../generate";

export default function ProfilePage() {
  const profile = generateProfile();
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
          <button className="btn">Posts</button>
          <button className="btn">Reviews</button>
        </div>
      </div>
    </div>
  );
}
