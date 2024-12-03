import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import axios from "axios";
import { API_BASE_URL } from "../config";
import FollowButton from "../components/FollowButton"; // Assuming FollowButton is in this location

export default function ProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("posts");
  const [posts, setPosts] = useState([]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/username/${username}`
      );

      setProfile(response.data);
      setLoading(false);

      console.log("fetched:", response.data.userId);
      const response2 = await axios.get(
        `${API_BASE_URL}/users/${response.data.userId}/posts`
      );
      console.log("r2.data.data", response2.data.data.posts);
      setPosts(response2.data.data.posts);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]);

  useEffect(() => {
    console.log("posts", posts);
  }, [posts]);

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
      <div className="flex flex-col items-center pt-8">
                
        <div className="avatar mb-4">
                    
          <div className="ring-primary ring-offset-base-100 w-48 rounded-full ring ring-offset-2">
                        
            <img
              src={
                profile.profilePic
                  ? `${API_BASE_URL}/users/${profile.userId}/profile-pic`
                  : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
              }
              alt={profile.name}
            />
                      
          </div>
                  
        </div>
                <p className="text-3xl">{profile.name}</p>
                
        <p className="text-gray-500 text-lg mb-4">@{profile.username}</p>
        {/* Add bio display */}
        {profile.bio && (
          <p className="text-gray-700 text-center max-w-md mb-4">
            {profile.bio}
          </p>
        )}
        {profile.university && (
          <p className="text-gray-500 mb-4">{profile.university}</p>
        )}
        <div className="flex gap-8 mb-4">
          <div className="text-center">
            <p className="text-xl font-semibold">
              {profile.followers?.length || 0}
            </p>
            <p className="text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold">
              {profile.following?.length || 0}
            </p>
            <p className="text-gray-500">Following</p>
          </div>
        </div>
                
        <div className="flex gap-4 mb-4">
                    
          <button
            className={`btn ${view === "posts" ? "btn-primary" : ""}`}
            onClick={() => setView("posts")}
          >
                        Posts           
          </button>
                    
          <FollowButton
            targetUserId={profile.userId}
            onFollowToggle={fetchProfile}
          />
                  
        </div>
              
      </div>
      {view == "posts" && posts && posts.length > 0 ? (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">No posts yet</div>
      )}
    </div>
  );
}
