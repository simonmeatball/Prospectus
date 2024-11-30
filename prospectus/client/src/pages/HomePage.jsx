import React, { useState, useEffect } from "react";
import Homenavbar from "../components/HomePage/Homenavbar.jsx";
import axios from "axios";
import { API_BASE_URL } from "../config";

import PostCard from "../components/PostCard";
import Sidebar from "./sidebar.jsx";
import { Search } from "lucide-react";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/posts`);
        if (response.data.success) {
          setPosts(response.data.data);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div>
        <Homenavbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Homenavbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ userSelect: "none" }}
      className=" bg-[url('../images/bea.jpg')] pt-10"
    >
      <Homenavbar />

      <div className="form-control mb-9 ">
        <input
          type="text"
          placeholder="Search Prospectus"
          className="input input-bordered mx-auto text-black bg-cyan-100 w-3/5 border-gray-600"
        />
      </div>

      <Sidebar />

      <div className="flex justify-center items-start gap-8">
        <div className="grid grid-cols-1 px-4 h-[48rem]">
          <h1 className="text-3xl text-center text-white font-bold mb-4 drop-shadow-m animate-bounce">
            <span style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
              Editor's Choice ⭐
            </span>
          </h1>
          {posts.slice(0, 2).map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        <div className="grid grid-cols-1 px-4 h-[48rem]">
          <h1 className="text-3xl text-center text-white font-bold mb-4 drop-shadow-m animate-bounce">
            <span style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
              New ✨
            </span>
          </h1>
          {posts.slice(-2).map((post) => (
            <PostCard key={post._id} post={post} className="" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
