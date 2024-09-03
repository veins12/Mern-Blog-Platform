// models/comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: false }, // Change required to false
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema); // Make sure the model name is correctly capitalized
