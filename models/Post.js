const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true },
  authorType: { type: String, required: true },
  authorId: { type: String, required: true },
  description: { type: String, trim: true },
  subName: String,
  dueDate: Date,
  file: Array,
  url: Array,
  postType: { type: String, required: true, default: "Other" }
}, {
  timestamps: true
});

const Post = mongoose.model("posts", PostSchema);

module.exports = Post;
