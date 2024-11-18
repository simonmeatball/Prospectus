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

module.exports = { getPosts, createPost, deletePost };
