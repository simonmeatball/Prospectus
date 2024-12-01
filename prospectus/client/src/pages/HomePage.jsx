import React, { useState, useEffect } from "react";
//import Homenavbar from "../components/HomePage/Homenavbar.jsx";

import Navbar from "./Navbar.jsx";
import axios from "axios";
import { API_BASE_URL } from "../config";

import PostCard from "../components/PostCard";
import Sidebar from "./sidebar.jsx";

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
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
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
      <Navbar />


      <Sidebar />   {/* THE SIDEBAR COMPONENT */}


    </div>
  );
}

export default HomePage;
