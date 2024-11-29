const express = require("express");
const router = express.Router();
const {
  getComments,
  createComment,
  deleteComment,
  getCommentByID,
} = require("../controllers/comment.controller.js");

router.get("/", getComments);
router.get("/:id", getCommentByID); // Ensure this line is correct
router.post("/", createComment);
router.delete("/:id", deleteComment);

module.exports = router;
