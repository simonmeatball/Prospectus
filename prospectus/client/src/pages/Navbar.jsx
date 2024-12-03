import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../config";

import Logo1 from "../images/logo1.png";

export default function Navbar() {
  const { isAuthenticated, logout, user, profilePic } = useAuth();
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
      const postsResponse = await axios.get(`${API_BASE_URL}/posts`);
      const usersResponse = await axios.get(`${API_BASE_URL}/users`);

      const allPosts = postsResponse.data.success
        ? postsResponse.data.data
        : [];
      const allUsers = usersResponse.data || [];

      console.log("all posts fetched:", postsResponse.data.data);
      console.log("all users fetched:", usersResponse.data);
      console.log("users:", allUsers);

      const filteredPosts = allPosts.filter((post) => {
        const regex = new RegExp(`\\b${debouncedSearchQuery}`, "i");
        const titleMatch = regex.test(post.title.toLowerCase());
        const tagsMatch = post.tags.some((tag) => {
          const regex = new RegExp(
            `^${debouncedSearchQuery.toLowerCase()}`,
            "i"
          );
          return regex.test(tag.toLowerCase());
        });
        return titleMatch || tagsMatch;
      });

      const filteredUsers = allUsers.filter((user) =>
        user.username
          .toLowerCase()
          .startsWith(debouncedSearchQuery.toLowerCase())
      );

      setResults([
        ...filteredPosts.map((post) => ({ ...post, type: "post" })),
        ...filteredUsers.map((user) => ({ ...user, type: "user" })),
      ]);
      console.log("search results:", results);
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

  const handleResultClick = (id, type) => {
    setShowResults(false);

    if (type === "post") {
      navigate(`/post/${id}`);
    } else if (type === "user") {
      console.log(id);
      navigate(`/profile/${id}`);
    }
  };

  const handleSelection = (type, index) => {
    if (results[index]) {
      const selectedItem = results[index];
      console.log(selectedItem);
      console.log(results[index]);

      if (type === "post") {
        handleResultClick(selectedItem._id, type);
      } else if (type === "user") {
        handleResultClick(selectedItem.username, type);
      }
    }
  };

  const renderItem = (item, index) => {
    const isUser = item.type === "user";
    const isPost = item.type === "post";
    return (
      <div
        key={item._id || item.username}
        onMouseDown={() =>
          handleResultClick(item._id || item.username, item.type)
        }
        ref={index === focusedIndex ? resultContainer : null}
        style={{
          backgroundColor: index === focusedIndex ? "rgba(0,0,0,0.1)" : "",
        }}
        className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
      >
        <div className="flex items-center gap-2">
          {isUser && (
            <span className="text-sm text-blue-500">@{item.username}</span>
          )}

          {isPost && (
            <>
              {item.tags &&
                item.tags.length > 0 &&
                item.tags
                  .filter((tag) =>
                    tag
                      .toLowerCase()
                      .startsWith(debouncedSearchQuery.toLowerCase())
                  )
                  .map((matchingTag, idx) => (
                    <span
                      key={idx}
                      className="inline-block text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {matchingTag}
                    </span>
                  ))}
              <span>{item.title}</span>
            </>
          )}
        </div>
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
                  onMouseDown={() => handleSelection(item.type, index)}
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
            <div className="w-10 rounded-full">
              <img
                alt="Profile Pic"
                src={profilePic}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
                }}
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
