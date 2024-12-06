import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config";

export default function FollowButton({ targetUserId, onFollowToggle }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/users/${user?.userId}/following/${targetUserId}`
        );
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };

    if (user?.userId && targetUserId && user.userId !== targetUserId) {
      checkFollowStatus();
    }
  }, [user?.userId, targetUserId]);

  const handleFollow = async () => {
    if (!user) {
      console.error("No user logged in");
      return;
    }

    try {
      const endpoint = isFollowing ? "unfollow" : "follow";
      const response = await axios.post(
        `${API_BASE_URL}/users/${user.userId}/${endpoint}/${targetUserId}`
      );

      if (response.data.success) {
        setIsFollowing(!isFollowing);
        if (onFollowToggle) {
          onFollowToggle();
        }
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  if (!user || user.userId === targetUserId) {
    return null;
  }

  return (
    <button
      onClick={handleFollow}
      className={`px-4 py-2 rounded-full text-sm font-medium mb-1 ${
        isFollowing
          ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}
