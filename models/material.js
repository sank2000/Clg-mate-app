const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, trim: true },
  description: { type: String, trim: true },
  subName: { type: String, trim: true, default: "General" },
  file: { type: Array, required: true },
  url: { type: Array, required: true },
  postBy: { type: String, required: true },
  postByType: { type: String, required: true },
  postById: { type: String, required: true },
  materialType: { type: String, default: "Other" }
}, {
  timestamps: true
});

const Material = mongoose.model("materials", MaterialSchema);

module.exports = Material;
