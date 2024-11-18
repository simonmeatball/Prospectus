const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profilePic: {
    type: String,
    default: "https://commons.wikimedia.org/wiki/File:Default_pfp.jpg",
    required: true,
  },
  bio: { type: String, default: "", required: true },
  university: { type: String, default: "", required: true },
  accountType: {
    type: String,
    enum: ["recruiter", "candidate"],
    required: true,
  },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }], // This references the User model (self) to create a list of followers
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", userSchema);
