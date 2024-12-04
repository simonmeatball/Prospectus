const User = require("../models/user.model.js");
const Post = require("../models/post.model.js");
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const Comment = require("../models/comment.model.js");

let bucket;
mongoose.connection.once("open", () => {
  bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
});

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const userData = req.body;

    if (!userData.name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Handle profile picture upload if present
    if (req.file) {
      const readableStream = require("stream").Readable.from(req.file.buffer);
      const uploadStream = bucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype,
      });

      await new Promise((resolve, reject) => {
        readableStream
          .pipe(uploadStream)
          .on("error", reject)
          .on("finish", () => {
            userData.profilePic = uploadStream.id;
            resolve();
          });
      });
    }

    const user = new User(userData);
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findOne({ userId: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle optional fields (allow empty strings)
    const optionalFields = ["bio", "university"];
    optionalFields.forEach((field) => {
      if (field in updates) {
        updates[field] = updates[field] || ""; // Convert null/undefined to empty string
      }
    });

    // Handle required fields (don't update if empty)
    const requiredFields = ["name", "username", "email"];
    requiredFields.forEach((field) => {
      if (!updates[field]) {
        delete updates[field]; // Remove empty required fields from updates
      }
    });

    // Handle new profile picture upload if present
    if (req.file) {
      try {
        // Delete old profile picture if exists
        if (user.profilePic) {
          try {
            await bucket.delete(new mongoose.Types.ObjectId(user.profilePic));
          } catch (deleteError) {
            console.log("No existing file to delete or error:", deleteError);
          }
        }

        const readableStream = require("stream").Readable.from(req.file.buffer);
        const uploadStream = bucket.openUploadStream(req.file.originalname, {
          contentType: req.file.mimetype,
        });

        await new Promise((resolve, reject) => {
          readableStream
            .pipe(uploadStream)
            .on("error", (error) => {
              console.error("Upload error:", error);
              reject(error);
            })
            .on("finish", () => {
              updates.profilePic = uploadStream.id.toString();
              console.log("File uploaded, new ID:", updates.profilePic);
              resolve();
            });
        });
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return res.status(400).json({ message: "File upload failed" });
      }
    }

    // Update user document
    const updatedUser = await User.findOneAndUpdate(
      { userId: req.params.userId },
      { ...updates },
      { new: true, runValidators: true }
    );

    console.log("User updated:", updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Update a user's password
const updateUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const updatedUser = await User.findOne({ userId: req.params.userId });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect =
      await updatedUser.comparePassword(currentPassword);

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Incorrect password" });

    updatedUser.password = newPassword;
    await updatedUser.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a user's forgot password
const updateUserForgotPassword = async (req, res) => {
  try {
    const updatedUser = await User.findOne({ userId: req.params.userId });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    updatedUser.password = req.body.newForgotPassword;
    await updatedUser.save();
    
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Verify user exists
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({ message: "User not found" });
    }

    // Remove user from everyone's followers and following lists
    await Promise.all([
      User.updateMany(
        { followers: user.userId },
        { $pull: { followers: user.userId } },
        { session }
      ),
      User.updateMany(
        { following: user.userId },
        { $pull: { following: user.userId } },
        { session }
      ),
    ]);

    // Get all posts that the user has liked and update them
    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } });
    for (const post of likedPosts) {
      post.likes = Math.max(0, post.likes - 1);
      post.likedBy = post.likedBy.filter(username => username !== user.username);
      await post.save({ session });
    }

    // Get all posts by the user
    const userPosts = await Post.find({ userID: user.userId });

    // Remove user's posts from other users' likedPosts arrays
    const userPostIds = userPosts.map(post => post._id);
    await User.updateMany(
      { likedPosts: { $in: userPostIds } },
      { $pull: { likedPosts: { $in: userPostIds } } },
      { session }
    );

    // Delete all comments on user's posts
    await Comment.deleteMany(
      { postID: { $in: userPostIds } },
      { session }
    );

    // Delete all comments by this user
    await Comment.deleteMany(
      { username: user.username },
      { session }
    );

    // Delete all posts by this user
    await Post.deleteMany(
      { userID: user.userId },
      { session }
    );

    // Delete the user
    await User.findOneAndDelete({ userId: req.params.userId }, { session });

    // Commit the transaction
    await session.commitTransaction();
    res.status(200).json({ message: "Account and associated data deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

// Get user's posts
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Getting posts for user:", userId);

    // Find the user and populate their posts
    const user = await User.findOne({ userId }).populate({
      path: "posts",
      options: { sort: { createdAt: -1 } },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log("Found user with posts:", user);

    res.status(200).json({
      success: true,
      data: {
        posts: user.posts,
        user: {
          name: user.name,
          username: user.username,
          profilePic: user.profilePic,
        },
      },
    });
  } catch (err) {
    console.error("Error fetching user posts", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    //get user's posts
    const posts = await Post.find({ userId: user.userId });

    // Include all user fields in response
    res.status(200).json({
      userId: user.userId,
      username: user.username,
      name: user.name,
      email: user.email,
      bio: user.bio,
      university: user.university,
      profilePic: user.profilePic,
      accountType: user.accountType,
      posts: posts,
      followers: user.followers || [],
      following: user.following || [],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Follow a user
const followUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { targetUserId } = req.params;

    const user = await User.findOne({ userId });
    const targetUser = await User.findOne({ userId: targetUserId });

    if (!user || !targetUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.following.includes(targetUserId)) {
      user.following.push(targetUserId);
      await user.save();

      targetUser.followers.push(userId);
      await targetUser.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Successfully followed user" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { targetUserId } = req.params;

    const user = await User.findOne({ userId });
    const targetUser = await User.findOne({ userId: targetUserId });

    if (!user || !targetUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.following = user.following.filter((id) => id !== targetUserId);
    await user.save();

    targetUser.followers = targetUser.followers.filter((id) => id !== userId);
    await targetUser.save();

    res
      .status(200)
      .json({ success: true, message: "Successfully unfollowed user" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Check if user is following another user
const checkFollowStatus = async (req, res) => {
  try {
    const { userId, targetUserId } = req.params;
    const user = await User.findOne({ userId });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isFollowing = user.following.includes(targetUserId);
    res.status(200).json({ success: true, isFollowing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get profile picture
const getProfilePic = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user || !user.profilePic) {
      return res.redirect(
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
      );
    }

    const file = await bucket
      .find({ _id: new mongoose.Types.ObjectId(user.profilePic) })
      .toArray();
    if (!file || file.length === 0) {
      return res.redirect(
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
      );
    }

    bucket
      .openDownloadStream(new mongoose.Types.ObjectId(user.profilePic))
      .pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
};
