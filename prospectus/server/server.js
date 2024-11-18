const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post.route.js");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/posts", postRoutes);

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
