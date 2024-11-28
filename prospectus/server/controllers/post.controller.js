const Post = require("../models/post.model.js");
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

let bucket;
mongoose.connection.once("open", () => {
  bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
});

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
  try {
    const { title, body } = req.body;

    const postData = {
      title,
      body,
    };

    if (req.file) {
      // Create a readable stream from the uploaded file buffer
      const readableStream = require("stream").Readable.from(req.file.buffer);

      // Upload to GridFS
      const uploadStream = bucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype,
      });

      await new Promise((resolve, reject) => {
        readableStream
          .pipe(uploadStream)
          .on("error", reject)
          .on("finish", () => {
            postData.image = uploadStream.id; // Store the GridFS file ID
            postData.fileType = req.file.mimetype; // Store the file type
            resolve();
          });
      });
    }

    // Validate required fields
    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: "Title and body are required",
      });
    }

    const newPost = new Post(postData);
    await newPost.save();

    res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    console.error("Error saving post", err);
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

// Add this new route to serve files
const getFile = async (req, res) => {
  try {
    const file = await bucket
      .find({ _id: new mongoose.Types.ObjectId(req.params.id) })
      .toArray();

    if (!file || file.length === 0) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    res.set("Content-Type", file[0].contentType);
    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(req.params.id)
    );
    downloadStream.pipe(res);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  getFile,
};
