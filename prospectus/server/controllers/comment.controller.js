const Comment = require("../models/comment.model.js");

const getComments = async (req, res) => {
  try {
    const { postID } = req.query;
    console.log("Fetching comments for postID:", postID);

    // If no postID is provided, return all comments
    const query = postID ? { postID: postID } : {};

    const populateReplies = (depth) => {
      if (depth === 0) return null;
      return {
        path: "replies",
        populate: {
          path: "replies",
          populate: populateReplies(depth - 1),
        },
      };
    };

    const comments = await Comment.find(query).populate(populateReplies(4));
    console.log("Found comments:", comments);

    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { text, postID, username, parentCommentID } = req.body;
    console.log("Received comment data:", {
      text: text || "missing",
      username: username || "missing",
      postID: postID || "missing",
      parentCommentID: parentCommentID || "null",
    });

    // Require text and username for all comments
    if (!text || !username) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: text and username are required",
        received: { text, username },
      });
    }

    // Require postID for top-level comments (comments without a parent)
    if (!parentCommentID && !postID) {
      return res.status(400).json({
        success: false,
        message: "postID is required for top-level comments",
        received: { postID },
      });
    }

    const newComment = new Comment({
      text,
      postID,
      username,
      parentCommentID,
    });

    await newComment.save();

    if (parentCommentID) {
      // Add the new comment to the parent comment's replies array
      await Comment.findByIdAndUpdate(parentCommentID, {
        $push: { replies: newComment._id },
      });
    }

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

const addReply = async (req, res) => {};

const patchCommentReplies = async (req, res) => {
  try {
    const { id } = req.params;
    const { replies } = req.body;

    if (!Array.isArray(replies)) {
      return res.status(400).json({
        success: false,
        message: "Replies must be an array",
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { replies },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    res.status(200).json({ success: true, data: updatedComment });
  } catch (err) {
    console.error("Error updating comment replies:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getComments,
  createComment,
  deleteComment,
  getCommentByID,
  addReply,
  patchCommentReplies,
};
