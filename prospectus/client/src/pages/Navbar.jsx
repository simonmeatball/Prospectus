import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../config";

import Logo1 from "../images/logo1.png";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const resultContainer = useRef(null);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const debounceTimeoutRef = useRef(null);

  // const debouncedSearchQuery = useDebounce(searchQuery, 500); //500 ms delay before making search request

  const handleDebounce = (value) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(value);
    }, 400);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    console.log(query);
    setShowResults(true);
    handleDebounce(query);

    if (!debouncedSearchQuery.trim()) {
      setResults([]);
      return;
    }

    handleSearch();
  };

  const handleSearch = async () => {
    if (!debouncedSearchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    console.log("search initiated:", debouncedSearchQuery);

    try {
      const response = await axios.get(`${API_BASE_URL}/api/posts`);
      if (response.data.success) {
        const allPosts = response.data.data;
        console.log("all posts fetched:", response.data.data);

        const filteredPosts = allPosts.filter((post) => {
          const regex = new RegExp(`\\b${debouncedSearchQuery}`, "i");
          return regex.test(post.title.toLowerCase());
        });

        setResults(filteredPosts);
        console.log(filteredPosts);
      }
    } catch (err) {
      setError("failed to search results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchQuery) {
      handleSearch();
    }
  }, [debouncedSearchQuery]);

  const handleResultClick = (postId) => {
    navigate(`/post/${postId}`);
    setShowResults(false);
  };

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
    <div className="navbar bg-white fixed top-0 z-10 w-full">
      <div className="flex-1">
        <img className="w-16" src={Logo1} draggable="false" />
        <Link
          className="btn btn-ghost text-amber-500 font-bold italic text-2xl tracking-wide"
          to="/home"
        >
          prospectus
        </Link>
      </div>
      <div className="flex-none gap-2 ">
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
          />
        </div>

        {showResults && (
          <div
            className="absolute mt-2 w-full p-2 bg-white shadow-lg rounded-b max-h-56 overflow-y-auto z-[1]"
            style={{
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
                    backgroundColor:
                      index === focusedIndex ? "rgba(0,0,0,0.1)" : "",
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
            <div className="w-10 rounded-full ">
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
              <Link
                to={`/profile/${user?.username}`}
                className="justify-between"
              >
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to={`/profile/${user?.username}/settings`}>Settings</Link>
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
          <button
            onClick={handleLogout}
            className="btn btn-primary bg-blue-300 hover:bg-sky-500 border-gray-600 "
          >
            Sign Out
          </button>
        ) : (
          <Link
            to="/login"
            className="btn btn-primary bg-sky-300 hover:bg-sky-500 border-gray-800"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
