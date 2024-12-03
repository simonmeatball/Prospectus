const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateUserPassword,
  updateUserForgotPassword,
  deleteUser,
  getUserPosts,
  getUserByUsername,
  followUser,
  unfollowUser,
  checkFollowStatus,
  getProfilePic,
} = require("../controllers/user.controller");

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, JPG, and PNG files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
}).single("profilePic");

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:userId", getUser);

// Get user's posts
router.get("/:userId/posts", getUserPosts);

//get user by username
router.get("/username/:username", getUserByUsername);

// Create a new user
router.post("/", createUser);

// Update a user by ID
router.patch("/:userId", (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: `File upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    updateUser(req, res);
  });
});

// Add route for uploading profile picture
router.post("/:userId/profile-pic", upload, updateUser);

// Add route for retrieving profile picture
router.get("/:userId/profile-pic", getProfilePic);

// Update a user's password
router.patch("/:userId/password", updateUserPassword);

// Update a user's forgot password
router.patch("/:userId/forgot-password", updateUserForgotPassword);

// Delete a user by ID
router.delete("/:userId", deleteUser);

// Follow routes
router.post("/:userId/follow/:targetUserId", followUser);
router.post("/:userId/unfollow/:targetUserId", unfollowUser);
router.get("/:userId/following/:targetUserId", checkFollowStatus);

module.exports = router;
