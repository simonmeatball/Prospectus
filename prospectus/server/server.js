const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post.route.js");
const userRoutes = require("./routes/user.route.js");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log("Server started on port", process.env.PORT);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
