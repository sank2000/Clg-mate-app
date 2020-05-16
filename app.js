require('dotenv').config();

const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session")

const posts = require('./routes/Posts');
const auth = require('./routes/Auth');
const mail = require('./routes/mail');
const materials = require('./routes/materials');

console.log("all require done");

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
console.log("before use");

app.use('/posts', posts);
console.log("after use of post");


app.use('/auth', auth);
console.log("after use of auth");


app.use('/materials', materials);
console.log("after use of material");


app.use('/mail', mail);
console.log("after use of mail");

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started at port 5000");
});


if (process.env.NODE_ENV === 'production') {
  // Set static folder
  console.log("inside production");
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

