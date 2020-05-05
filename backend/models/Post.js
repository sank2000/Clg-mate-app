const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  author: String,
  description: String,
  subName: String,
  subCode: String,
  DueDate: Date,
  file: String,
  url: String
}, {
  timestamps: true
});

const Post = mongoose.model("posts", PostSchema);

module.exports = Post;
