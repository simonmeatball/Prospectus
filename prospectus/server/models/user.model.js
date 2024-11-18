const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  profilePic: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106",
    required: false,
  },
  bio: { type: String, default: "", required: false },
  university: { type: String, default: "", required: false },
  accountType: {
    type: String,
    enum: ["recruiter", "candidate"],
    required: true,
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // This references the User model (self) to create a list of followers
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", userSchema);
