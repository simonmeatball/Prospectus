const Post = require("../models/post.model.js");
const multer = require("multer");
const path = require("path");

// Fetch all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.error("Error fetching posts", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create a new post
const createPost = async (req, res) => {
  // Multer will add the uploaded file to the `req.file` property
  const post = req.body;
  if (req.file) {
    post.image = req.file.path; // Save the image path to the post object
  }

  console.log("Received Post Data:", post);

  // Check for required fields (name, description, or image)
  if (!post.name || (!post.description && !post.image)) {
    return res
      .status(400)
      .json({ success: false, message: "Fill in all data fields" });
  }

  const newPost = new Post(post);
  try {
    await newPost.save();
    res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    console.error("Error saving post", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a post by ID
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (err) {
    res.status(404).json({ success: false, message: "Post not found" });
  }
};

// Like a post
const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    post.likes = (post.likes || 0) + 1;
    await post.save();
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    console.error("Error liking post", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Unlike a post
const unlikePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    if ((post.likes || 0) > 0) {
      post.likes -= 1;
      await post.save();
    }
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    console.error("Error unliking post", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getPosts, createPost, deletePost, likePost, unlikePost };
