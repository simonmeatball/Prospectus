const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    username: {
      type: String,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
