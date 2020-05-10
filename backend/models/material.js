const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true },
  description: { type: String, trim: true },
  subName: String,
  subCode : String,
  file: String,
  url: String,
  postBy : String,
}, {
  timestamps: true
});

const Material = mongoose.model("materials", MaterialSchema);

module.exports = Material;
