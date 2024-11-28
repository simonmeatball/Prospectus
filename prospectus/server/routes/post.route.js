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
} = require("../controllers/post.controller.js");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads/"); // Specify the folder to save files in
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // Accept file
  } else {
    return cb(new Error("Only image files are allowed"), false); // Reject file
  }
};

// Set up multer middleware for single image upload (this will handle 'image' field)
const upload = multer({ storage, fileFilter });

// Route for getting all posts
router.get("/", getPosts);

// Route for creating a post (with multer middleware to handle file upload)
router.post("/", upload.single("image"), createPost); // 'image' is the form field name for the file

// Route for deleting a post by ID
router.delete("/:id", deletePost);

// Route for liking a post
router.patch("/:id/like", likePost);

// Route for unliking a post
router.patch("/:id/unlike", unlikePost);

module.exports = router;
