import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import MiniPost from "../components/ProfilePage/MiniPost";
import axios from "axios";

export default function ProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("posts");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/users/username/${username}`);
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="alert alert-error">
            <span>{error || "Profile not found"}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="avatar mb-4">
          <div className="ring-primary ring-offset-base-100 w-48 rounded-full ring ring-offset-2">
            <img src={profile.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt={profile.name} />
          </div>
        </div>
        <p className="text-3xl">{profile.name}</p>
        <p className="text-gray-500 text-lg mb-4">@{profile.username}</p>
        {profile.university && (
          <p className="text-gray-500 mb-4">{profile.university}</p>
        )}
        <div className="flex gap-4 mb-4">
          <button
            className={`btn ${view === "posts" ? "btn-primary" : ""}`}
            onClick={() => setView("posts")}
          >
            Posts
          </button>
        </div>
      </div>
      {view === "posts" && profile.posts && profile.posts.length > 0 ? (
        <div className="container mx-auto px-4">
          {profile.posts.map((post) => (
            <div key={post._id} className="mb-4">
              <MiniPost post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          No posts yet
        </div>
      )}
    </div>
  );
}