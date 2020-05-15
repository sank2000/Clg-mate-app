require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session")

const posts = require('./routes/posts');
const materials = require('./routes/materials');
const auth = require('./routes/auth');
const mail = require('./routes/mail');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'San and krish',
  resave: false,
  saveUninitialized: true,
}));

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use('/posts', posts);
app.use('/auth', auth);
app.use('/materials', materials);
app.use('/mail', mail);

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
