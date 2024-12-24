const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postRoutes = require("./routes/post.route.js");
const userRoutes = require("./routes/user.route.js");
const authRoutes = require("./routes/auth.route.js");
const commentRoutes = require("./routes/comment.route.js");
const path = require("path");
const fs = require("fs");

dotenv.config();
const app = express();

const VITE_PORT = process.env.VITE_APP_PORT | 5173;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV !== "production") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(PORT, () => {
        console.log("Server started on port", PORT);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// For Vercel serverless function
module.exports = async (req, res) => {
  await mongoose.connect(process.env.MONGO_URI);
  return app(req, res);
};
