const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getPosts,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  getFile,
  getPost,
} = require("../controllers/post.controller.js");

// Configure multer for memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Route for getting all posts
router.get("/", getPosts);

// Route for creating a post (with multer middleware to handle file upload)
router.post("/", upload.single("file"), createPost);

// Route for getting a file by ID
router.get("/file/:id", getFile);

// Route for deleting a post by ID
router.delete("/:id", deletePost);

// Route for liking a post
router.patch("/:id/like", likePost);

// Route for unliking a post
router.patch("/:id/unlike", unlikePost);

// Route for getting a post by ID
router.get("/:id", getPost);

module.exports = router;
