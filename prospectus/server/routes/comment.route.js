const express = require("express");
const router = express.Router();
const {
  getComments,
  createComment,
  deleteComment,
} = require("../controllers/comment.controller.js");

router.get("/", getComments);

router.post("/", createComment);

router.delete("/:id", deleteComment);

module.exports = router;
