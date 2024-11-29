import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";


export default function Navbar() {
  const { isAuthenticated, logout , user} = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(""); 
  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [showResults, setShowResults] = useState(false); 

  const resultContainer = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearchChange = (event) => { 
      setSearchQuery(event.target.value);
      console.log(event.target.value); 
      setShowResults(true);
  }

  const handleSearch = async() => { 
    if (!searchQuery.trim()) {
      setShowResults(false);
      return; 
    }
    setLoading(true);
    setError(null); 
    console.log("search initiated:", searchQuery);
    
    try { 
      const response = await axios.get("http://localhost:8080/api/posts");
      if (response.data.success) { 
        const allPosts = response.data.data
        console.log("all posts fetched:", response.data.data);
      
      const filteredPosts = allPosts.filter((post) => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
     );
     
     setResults(filteredPosts);
     console.log(filteredPosts); 
      }
    } catch (err)  {
      setError("failed to search results"); 
    } finally { 
      setLoading(false); 
    }
  }; 

  const handleResultClick = (postId) => {
    navigate(`/post/${postId}`);
    setShowResults(false);
  }

  const handleSelection = (index) => { 
    if (results[index]) {
      handleResultClick(results[index]._id);
    }
  };

  const renderItem = (item) => { 
    return (
      <div className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2">
        {item.title}
      </div>
    );
  };

  return (
    <div className="navbar bg-blue-100 fixed top-0 z-10 w-full">
      <div className="flex-1">
        <Link className="btn btn-ghost font-bold italic text-xl" to="/">
          prospectus
        </Link>
      </div>
      <div className="flex-none gap-2">
        {isAuthenticated && (
          <Link to="/upload" className="btn btn-ghost btn-sm">
            Upload Post
          </Link>
        )}
        <div className="form-control relative">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            value={searchQuery} 
            onChange={handleSearchChange}
            onKeyDown={(e) => {  
              if (e.key == "Enter") {
                handleSearch(); 
              }
            }}
          />
        </div>

        { showResults && (
          <div 
          className="absolute mt-2 w-full p-2 bg-white shadow-lg rounded-b max-h-56 overflow-y-auto z-[1]"
          style = {{
            top: 60 + "px",
          }}
          >
            {results.map((item, index) => {
              return (
                <div 
                  key={item._id}
                  onMouseDown={() => handleSelection(index)}
                  ref={index === focusedIndex ? resultContainer : null}
                  style={{
                    backgroundColor: index === focusedIndex ? "rgba(0,0,0,0.1)" : "",
                  }}
                className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
                >
                  {renderItem(item)} 
                </div>
              );
            })}
            </div> 
            )}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={`/profile/${user?.username}`} className = "justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/upload">Upload Post</Link>
              </li>
            )}
            {isAuthenticated ? (
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="btn btn-primary">
            Sign Out
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
