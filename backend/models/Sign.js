const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  username : String,
  password : String
});

const user = mongoose.model("loginDetails", User);

module.exports = user;