const Post = require("../models/post.model.js");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.error("Error fetching posts", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

const createPost = async (req, res) => {
  const post = req.body;
  if (!post.name || !post.description || !post.image) {
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

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (err) {
    res.status(404).json({ success: false, message: "Post not found" });
  }
};

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
