const Comment = require("../models/comment.model.js");

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    console.error("Error fetching comments", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

const createComment = async (req, res) => {
  const comment = req.body;
  if (!comment.text || !comment.postId || !comment.userId) {
    return res
      .status(400)
      .json({ success: false, message: "Fill in all required fields" });
  }
  const newComment = new Comment(comment);
  try {
    await newComment.save();
    res.status(201).json({ success: true, data: newComment });
  } catch (err) {
    console.error("Error saving comment", err.message);
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

module.exports = { getComments, createComment, deleteComment };
