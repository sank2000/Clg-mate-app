const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const User = new Schema({
  unique_id: {
    type: String, required: true, index: { unique: true }
  },
  name: {
    type: String, required: true,
  },
  type: {
    type: String, required: true,
  },
  password: { type: String, required: true },
  email: { type: String, required: true },
  state: { type: String, required: true, default: 'default' }
});

const user = mongoose.model("loginDetails", User);

module.exports = user;
