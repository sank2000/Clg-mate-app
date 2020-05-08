const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const user = mongoose.model("loginDetails", User);

module.exports = user;
