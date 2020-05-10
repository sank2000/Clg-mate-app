const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const User = new Schema({
  username: {
    type: String, required: true, unique: true
  },
  password: { type: String, required: true }
});

const user = mongoose.model("loginDetails", User);

module.exports = user;
