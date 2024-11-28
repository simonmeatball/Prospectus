import React from "react";

const PostCard = ({ post }) => {
  const getFileType = (contentType) => {
    if (!contentType) return null;
    if (contentType.includes("image")) return "image";
    if (contentType.includes("pdf")) return "pdf";
    return null;
  };

  const renderFile = () => {
    if (!post.image) return null;

    const fileUrl = `http://localhost:8080/api/posts/file/${post.image}`;

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

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
      {post.image && renderFile()}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.title}</div>
        <p className="text-gray-700 text-base">{post.body}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="text-sm text-gray-600">Likes: {post.likes || 0}</span>
      </div>
    </div>
  );
};

export default PostCard;
