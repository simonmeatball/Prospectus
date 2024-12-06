import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/config";
import axios from "axios";
import { MessageCircle } from "lucide-react";

const getTagColor = (tag) => {
  const hash = tag.toLowerCase().split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 40%, 85%)`;
};

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/comments`, {
          params: { postID: post._id }
        });
        if (response.data.success) {
          setCommentCount(response.data.data.length);
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchCommentCount();
  }, [post._id]);

  const handleClick = () => {
    navigate(`/post/${post._id}`);
  };

  const getFileType = (contentType) => {
    if (!contentType) return null;
    if (contentType.includes("image")) return "image";
    if (contentType.includes("pdf")) return "pdf";
    return null;
  };

  const renderFile = () => {
    if (!post.image) return null;
    

    const fileUrl = `${API_BASE_URL}/posts/file/${post.image}`;

    // For PDF files
    if (post.fileType === "application/pdf") {
      return (
      
        <div className="flex flex-col items-center p-4">
          <embed src={fileUrl} type="application/pdf" className="w-full h-96" />
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Open PDF
          </a>
        </div>
      );
    }

    // For images
    return (
      <img
        className="w-full h-48 object-cover"
        src={fileUrl}
        alt={post.title}
      />
    );
  };

  const displayedTags = post.tags.slice(0, 3);
  const additionalTagCount = post.tags.length-3; 
  
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white cursor-pointer hover:shadow-xl transition-shadow"
      onClick={handleClick}
    >
      {post.image && renderFile()}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.title}</div>
        <p className="text-gray-700 text-base">{post.body}</p>
      </div>
      <div className="px-6 pt-2 pb-2">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {displayedTags.map((tag, index) => (
              <span 
                key={index}
                className="text-gray-700 px-3 py-1 rounded-full text-xs"
                style={{ backgroundColor: getTagColor(tag) }}
              >
                {tag}
              </span>
            ))}
            {additionalTagCount > 0 && (
              <span
                className="text-gray-500 text-xs"
                >
                  +{additionalTagCount}
                </span>
            )}
            </div>
        )}
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm text-gray-600">{post.likes || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-5 w-5 text-gray-600" />
            <span className="text-sm text-gray-600">{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
