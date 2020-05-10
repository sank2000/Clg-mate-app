require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session")

const posts = require('./routes/Posts');
const auth = require('./routes/Auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'San and krish',
  resave: false,
  saveUninitialized: true,
}))

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/posts', posts);
app.use('/auth', auth);

app.listen(5000, function (req, res) {
  console.log("Server started at port 5000");
})
