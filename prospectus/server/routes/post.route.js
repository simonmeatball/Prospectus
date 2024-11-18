const express = require("express");
const router = express.Router();
const Post = require("../models/post.model.js");
const {
  getPosts,
  createPost,
  deletePost,
  likePost,
  unlikePost,
} = require("../controllers/post.controller.js");

router.get("/", getPosts);

router.post("/", createPost);

router.delete("/:id", deletePost);

router.patch("/:id/like", likePost);

router.patch("/:id/unlike", unlikePost);

module.exports = router;
