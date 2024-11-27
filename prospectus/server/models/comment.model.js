const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postID: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
