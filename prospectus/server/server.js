const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/post.model.js');

dotenv.config();
const app = express();

app.use(express.json());

app.post("api/posts", async (req, res) => {
  const post = req.body;
  if (!post.name || !post.description || !post.image) {
    return res.status(400).json({ success:false, message: 'Fill in all data fields' });
  }

  const newPost = new Post(post);
  try {
    await newPost.save();
    res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    console.error("Error saving post", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log('Server started on port', process.env.PORT);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
