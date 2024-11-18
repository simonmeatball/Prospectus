const express = require("express");
const router = express.Router();
const Post = require("../models/post.model.js");
const {
  getPosts,
  createPost,
  deletePost,
} = require("../controllers/post.controller.js");

router.get("/", getPosts);

router.post("/", createPost);

router.delete("/:id", deletePost);

module.exports = router;
