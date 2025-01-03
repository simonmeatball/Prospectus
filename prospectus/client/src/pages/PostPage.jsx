import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { Heart, MessageCircle, MoreVertical } from "lucide-react";
import Review from "../components/PostPage/Review";
import DropdownMenu from "../components/PostPage/DropdownMenu";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";
import FollowButton from "../components/FollowButton";

const getTagColor = (tag) => {
  const hash = tag.toLowerCase().split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 40%, 85%)`;
};

export default function PostPage() {
  const { postID } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [dropdownShown, setDropdownShown] = useState(false);
  const [sortBy, setSortBy] = useState("Most recent");
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [postUser, setPostUser] = useState(null);
  const moreMenuRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/posts/${postID}`, {
          params: {
            userId: user?.userId,
          },
        });
        if (response.data.success) {
          console.log("Post data received:", response.data.data);
          setPost(response.data.data);
          setLiked(response.data.data.isLiked);

          // Fetch user info
          const userResponse = await axios.get(
            `${API_BASE_URL}/users/${response.data.data.userID}`
          );
          if (userResponse.data) {
            setPostUser(userResponse.data);
          }
        }
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postID, user]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/comments`, {
          params: { postID: postID },
        });
        if (response.data.success) {
          setComments(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching comments:", err.response || err);
      }
    };

    if (postID) {
      fetchComments();
    }
  }, [postID]); // Changed dependency from post to postID

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLike = async () => {
    try {
      if (!user) {
        console.error("No user logged in");
        return;
      }

      const endpoint = liked ? "unlike" : "like";
      const response = await axios.patch(
        `${API_BASE_URL}/posts/${postID}/${endpoint}`,
        {
          userId: user.userId,
        }
      );

      if (response.data.success) {
        setLiked(!liked);
        setPost((prevPost) => ({
          ...prevPost,
          likes: response.data.data.likes,
        }));
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;

    try {
      console.log("Submitting comment:", {
        text: commentText,
        postID: postID,
        username: user.username,
      });

      const response = await axios.post(`${API_BASE_URL}/comments`, {
        text: commentText,
        postID: postID,
        username: user.username,
        replies: [],
      });

      if (response.data.success) {
        // Add the new comment to the existing comments
        setComments((prevComments) => [...prevComments, response.data.data]);
        setCommentText("");
      }
    } catch (err) {
      console.error("Error posting comment:", err.response?.data || err);
      alert(
        "Error posting comment: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !user || !replyingTo) return;

    try {
      console.log("Submitting reply:", {
        text: replyText,
        postID: null, // Set postID to null
        username: user.username,
        parentCommentID: replyingTo, // Include parentCommentID
      });

      const response = await axios.post(`${API_BASE_URL}/comments`, {
        text: replyText,
        postID: null, // Set postID to null
        username: user.username,
        parentCommentID: replyingTo, // Include parentCommentID
        replies: [],
      });

      if (response.data.success) {
        const newReply = response.data.data;

        // Update the parent comment's replies array
        const updateReplies = (comments, parentId, newReply) => {
          return comments.map((comment) => {
            if (comment._id === parentId) {
              return {
                ...comment,
                replies: [...comment.replies, newReply],
              };
            }
            if (comment.replies && comment.replies.length > 0) {
              return {
                ...comment,
                replies: updateReplies(comment.replies, parentId, newReply),
              };
            }
            return comment;
          });
        };

        setComments((prevComments) =>
          updateReplies(prevComments, replyingTo, newReply)
        );

        setReplyText(""); // Clear reply text
        setReplyingTo(null);
      }
    } catch (err) {
      console.error("Error posting reply:", err.response?.data || err);
      alert(
        "Error posting reply: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const handleReply = (newReply) => {
    setComments((prevComments) => [...prevComments, newReply]);
  };

  const handleDelete = async () => {
    if (!user) return;

    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const response = await axios.delete(`${API_BASE_URL}/posts/${postID}`, {
        data: { userId: user.userId },
      });

      if (response.data.success) {
        navigate("/posts");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      alert(
        "Failed to delete post: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const renderReplies = (replies) => {
    if (!replies) return null; // Add check to ensure replies is defined
    return replies.map((reply) => (
      <div key={reply._id} className="ml-8 mt-4">
        <div className="p-4 bg-gray-100 rounded-lg border">
          <Link
            to={`/profile/${reply.username}`}
            className="text-sm font-medium"
          >
            @{reply.username || "Unknown"}
          </Link>
          {/* Ensure username is displayed */}
          <p className="mt-1">{reply.text || "No content"}</p>
          {/* Ensure text is displayed */}
          <p className="text-xs text-gray-500 mt-2">
            {reply.createdAt
              ? new Date(reply.createdAt).toLocaleString()
              : "Invalid Date"}
            {/* Ensure date is displayed */}
          </p>
          {user && (
            <button
              className="text-blue-500 text-sm mt-2"
              onClick={() => setReplyingTo(reply._id)}
            >
              Reply
            </button>
          )}
          {replyingTo === reply._id && (
            <form onSubmit={handleReplySubmit} className="mt-2">
              <textarea
                value={replyText} // Use replyText instead of commentText
                onChange={(e) => setReplyText(e.target.value)} // Use setReplyText instead of setCommentText
                placeholder="Write a reply..."
                className="w-full p-2 border rounded-lg mb-2"
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!replyText.trim()} // Use replyText instead of commentText
              >
                Post Reply
              </button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={() => setReplyingTo(null)}
              >
                Cancel
              </button>
            </form>
          )}
          {renderReplies(reply.replies)}
        </div>
      </div>
    ));
  };

  const sortComments = (comments) => {
    return comments.sort((a, b) => {
      if (sortBy === "Most recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "Least recent") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });
  };

  const renderComments = () => {
    const sortedComments = sortComments(comments);

    return (
      <div className="mt-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Comments ({comments.length})
          </h2>
          <DropdownMenu
            sortBy={sortBy}
            setSortBy={setSortBy}
            dropdownShown={dropdownShown}
            setDropdownShown={setDropdownShown}
          />
        </div>
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-2 border rounded-lg mb-2"
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!commentText.trim()}
            >
              Post Comment
            </button>
          </form>
        ) : (
          <p className="text-gray-500 mb-6">Please login to comment</p>
        )}
        <div className="space-y-4">
          {sortedComments.map((comment) => (
            <div key={comment._id} className="p-4 bg-white rounded-lg border">
              <Link
                to={`/profile/${comment.username}`}
                className="text-sm font-medium"
              >
                @{comment.username}
              </Link>
              <p className="mt-1">{comment.text}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
              {user && (
                <button
                  className="text-blue-500 text-sm mt-2"
                  onClick={() => setReplyingTo(comment._id)}
                >
                  Reply
                </button>
              )}
              {replyingTo === comment._id && (
                <form onSubmit={handleReplySubmit} className="mt-2">
                  <textarea
                    value={replyText} // Use replyText instead of commentText
                    onChange={(e) => setReplyText(e.target.value)} // Use setReplyText instead of setCommentText
                    placeholder="Write a reply..."
                    className="w-full p-2 border rounded-lg mb-2"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!replyText.trim()} // Use replyText instead of commentText
                  >
                    Post Reply
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ml-2"
                    onClick={() => setReplyingTo(null)}
                  >
                    Cancel
                  </button>
                </form>
              )}
              {renderReplies(comment.replies)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading || !post) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  console.log("Current post data:", post);
  const profile = {
    name: post.user?.name || "User",
    username: post.user?.username || post.userID,
    avatar: post.user?.profilePic
      ? `${API_BASE_URL}/users/${post.userID}/profile-pic`
      : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
  };
  console.log("Profile data:", profile);
  const reviews = [];

  function sortReviews() {
    switch (sortBy) {
      case "Most recent":
        return reviews.sort((a, b) => b.time - a.time);
      case "Least recent":
        return reviews.sort((a, b) => a.time - b.time);
      case "Highest rating":
        return reviews.sort((a, b) =>
          b.rating === a.rating ? b.time - a.time : b.rating - a.rating
        );
      case "Lowest rating":
        return reviews.sort((a, b) =>
          a.rating === b.rating ? b.time - a.time : a.rating - b.rating
        );
      default:
        return reviews.sort();
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex gap-8 m-8 justify-center">
        <div className="flex flex-col items-center">
          <Link to={`/profile/${profile.username}`}>
            <div className="avatar mb-2 cursor-pointer">
              <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                <img src={profile.avatar} alt="Profile" />
              </div>
            </div>
            <div className="text-gray-500 text-center mb-1">
              @{profile.username}
            </div>
          </Link>
          {user && user.userId !== post.userID && (
            <FollowButton targetUserId={post.userID} />
          )}
          <div>
            <p className="text-gray-500 mb-4">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 ${
                  liked
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-600 hover:text-gray-700"
                } transition-colors duration-200`}
              >
                <Heart
                  className={`w-8 h-8 transition-transform duration-200 hover:scale-110 ${
                    liked
                      ? "fill-red-500 stroke-red-500"
                      : "stroke-current hover:fill-gray-200"
                  }`}
                />
                <span className="text-lg font-medium">{post?.likes || 0}</span>
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <MessageCircle
                size={36}
                absoluteStrokeWidth
                className="cursor-pointer"
              />
              <span className="text-lg font-medium">{comments.length}</span>
            </div>
          </div>
        </div>
        <div className="w-3/4">
          <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold">{post.title}</h1>
                <Link
                  to={`/profile/${postUser?.username}`}
                  className="text-gray-600 hover:text-gray-800 text-sm mt-2 block"
                >
                  Posted by {postUser?.name || "Unknown"}
                </Link>
              </div>
              {user && post.userID === user.userId && (
                <div className="relative" ref={moreMenuRef}>
                  <button
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className="btn btn-ghost btn-sm"
                  >
                    <MoreVertical size={20} />
                  </button>
                  {showMoreMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <button
                          onClick={handleDelete}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Delete Post
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="mb-2">{post.body}</div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-gray-700 py-1 px-3 rounded-full text-sm font-medium"
                    style={{ backgroundColor: getTagColor(tag) }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {post.image && (
              <div className="bg-gray-200 min-h-64 mt-4 flex justify-center items-center">
                {post.fileType === "application/pdf" ? (
                  <embed
                    src={`${API_BASE_URL}/posts/file/${post.image}`}
                    type="application/pdf"
                    className="w-full h-[600px]"
                  />
                ) : (
                  <img
                    src={`${API_BASE_URL}/posts/file/${post.image}`}
                    alt={post.title}
                    className="max-w-full"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto h-px bg-gray-500"></div>
      <div className="w-11/12 mx-auto">
        {renderComments()}
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center pb-8">
          {sortReviews().map((reviewItem) => (
            <div className="mb-4">
              <Review review={reviewItem} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
