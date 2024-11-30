import React, { useState, useEffect } from "react";
import Homenavbar from "../components/HomePage/Homenavbar.jsx";
import axios from "axios";

import PostCard from "../components/PostCard";
import Sidebar from "./sidebar.jsx"


function HomePage() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/posts");
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
    <div style={{ userSelect: "none" }}>
      <Homenavbar />

      <div className="form-control mt-9 mb-9 ">
        <input
          type="text"
          placeholder="Search Prospectus"
          className="input input-bordered mx-auto  w-3/5 border-gray-600"
        />
      </div>

      <div className="flex justify-center mt-16">


        <Sidebar />   {/* SIDEBAR COMPONENT */}

        <div className="mr-[35rem] px-4 py-8">
          <div className="grid grid-cols-1 ">
            <h1 className="text-3xl text-center font-bold mb-5 drop-shadow-m " >  <span style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}> Editor's Choice ⭐ </span></h1> 
            {posts.slice(0, 2).map((post) => (
              <PostCard key={post._id} post={post} />
            ))}


          </div>
        </div>
      </div>
    </div>
  );


}

export default HomePage;
