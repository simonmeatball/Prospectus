const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postID: {
      type: String,
      required: false,
    },
    userID: {
      type: String,
      ref: "User",
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    likes: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
