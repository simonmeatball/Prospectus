import React, { useState, useEffect } from "react";
//import Homenavbar from "../components/HomePage/Homenavbar.jsx";

import Navbar from "./Navbar.jsx";
import axios from "axios";
import { API_BASE_URL } from "../config";

import PostCard from "../components/PostCard";
import Sidebar from "./sidebar.jsx";
import Pin from "../images/pin.png";

import { useAuth } from "../context/AuthContext";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [greeting, setGreeting] = useState(""); // State for the greeting

  const { user } = useAuth();

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


    const greetings = ["Welcome ", "Hello ", "Greetings ", "Salutations ", "A'hoy ", "What's good ", "Nice to see you "];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setGreeting(randomGreeting)

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


  const getDailyPost = (posts) => {
    const currentDate = new Date()
      .toISOString()
      .split(
        "T"
      )[0]; /* "YYYY-MM-DD" The string produced by toISOSTRING() is 2024-11-30T15:00:00.000Z. 
    So that's why we split by T and take the 0 index. */

    // get the saved date from localStorage
    const savedDate = localStorage.getItem("featuredPostDate");

    // check if the saved date is different from the current date
    if (savedDate !== currentDate) {
      // pick a random post if its a new day
      const randomPost = posts[Math.floor(Math.random() * posts.length)];

      // save the current date and the selected post's ID to localStorage
      localStorage.setItem("featuredPostDate", currentDate);
      localStorage.setItem("featuredPostId", randomPost._id);

      return randomPost;
    } else {
      // If it's the same day, get the previously saved post
      const savedPostId = localStorage.getItem("featuredPostId");
      const savedPost = posts.find((post) => post._id === savedPostId);

      return savedPost;
    }
  };

  const dailyPost = getDailyPost(posts);

  return (
    <div
      style={{ userSelect: "none" }}
      className="bg-white pt-10 overflow-x-hidden"
    >

      {/* <h1 className="flex justify-center text-6xl text-white mb-12 font-sans font-bold drop-shadow-2xl">  {greeting} {user?.username}!</h1> */}

      <div className="flex min-h-screen">



        {/* Left Post: The post generated by sidebar */}

        <Sidebar />

        <div className="flex-1 ml-40 mr-20 min-h-screen">

          <h1 className="text-3xl text-center text-black font-bold drop-shadow-m animate-bounce">
            <span style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
              The Daily Post 📰
            </span>
          </h1>

          <div style={{ position: 'relative', width: '100%' }}>

            <div
              key={dailyPost._id}
              className="lg:w-80 md:w-50 sm:w-30 h-auto bg-red-400 rounded-sm shadow-md overflow-hidden mx-auto mt-6"
            >
              <PostCard post={dailyPost} />
            </div>


            <img
              src={Pin}
              alt="Pin"
              style={{
                position: 'absolute',
                top: '0%',
                left: '0%',
                width: '15%',
                pointerEvents: 'none'  // so the pin doesn't block interactions with the post !
              }}
            />

            <img
              src={Pin}
              alt="Pin"
              style={{
                position: 'absolute',
                top: '0%',
                left: '84%',
                width: '15%',
                pointerEvents: 'none'
              }}
            />


          </div>


        </div>
      </div>

      <Navbar />
    </div>
  );
}

export default HomePage;
