const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  university: String,
  accountType: { type: String, enum: ['recruiter', 'candidate'], required: true },
});

module.exports = mongoose.model('User', userSchema);