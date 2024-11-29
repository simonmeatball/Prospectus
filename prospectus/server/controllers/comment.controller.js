const Comment = require("../models/comment.model.js");

const getComments = async (req, res) => {
  try {
    const { postID } = req.query;
    console.log("Fetching comments for postID:", postID); // Add debug log

    // Only get comments for the specific post
    const comments = await Comment.find({ postID: postID });
    console.log("Found comments:", comments); // Add debug log

    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { text, postID, username } = req.body;
    console.log("Received comment data:", {
      text: text || "missing",
      postID: postID || "missing",
      username: username || "missing",
    });

    if (!text || !postID || !username) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        received: { text, postID, username },
      });
    }

    const newComment = new Comment({
      text,
      postID,
      username,
    });

    await newComment.save();
    res.status(201).json({ success: true, data: newComment });
  } catch (err) {
    console.error("Error saving comment", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (err) {
    res.status(404).json({ success: false, message: "Comment not found" });
  }
};

const getCommentByID = async (req, res) => {
  try {
    const { id } = req.params;
    const { postID } = req.query;

    if (!postID) {
      return res.status(400).json({
        success: false,
        message: "postID is required",
      });
    }

    const comment = await Comment.find({
      _id: id,
      postID: postID,
    });

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    res.status(200).json({ success: true, data: comment });
  } catch (err) {
    console.error("Error fetching comment:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getComments,
  createComment,
  deleteComment,
  getCommentByID,
};
