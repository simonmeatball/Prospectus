require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Server started on port', process.env.PORT);
    });
  })
  .catch(err => console.log(err));
