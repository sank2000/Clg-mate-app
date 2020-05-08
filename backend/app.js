require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session")

const post = require('./models/Post');
const User = require('./models/Sign');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'San and krish',
  resave: false,
  saveUninitialized: true,
}))

//mongoose.connect("mongodb://localhost:27017/Clg_mt",{ useNewUrlParser: true , useUnifiedTopology: true});

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/posts", function (req, res) {
  console.log("Requesting...");
  post.find({}, function (err, result) {
    if (!err) {
      res.send(result);
    }
    else {
      console.log(err);
    }
  })
})

app.post("/newpost", function (req, res) {

  User.findById(req.session.user,"username",function(err,result)
  {
    if(err)
    {
      console.log(err);
    }
    else
    {
        const p = new post({
        title: req.body.title,
        author: result.username,
        description: req.body.description,
        subName: req.body.subName,
        postType: req.body.postType,
        dueDate: new Date(req.body.dueDate),
        file: req.body.file,
        url: req.body.url,
      }
      )
      p.save(function (err) {
        if (err) {
          console.log(err);
        }
        else {
          // res.send("<div><h1>Uploaded Successfully</h1><p>contact admin to remove files</p> </div>");
          res.redirect("/newpost/success");
        }
       })

    }
  });
  
})


app.post("/auth/signup", function (req, res) {
  const userData = new User(req.body)
  req.session.user = userData._id;
  userData.save()
    .then((result) => {
      res.json({
        message: 'Account created successfully',
        auth: true,
      });
    })
    .catch((err) => {
      res.json({
        message: 'Unable to create account',
        auth: false,
      });
    });
})

app.post("/auth/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    req.session.user = user._id;
    res.json({
      message: 'You are successfully login',
      auth: true,
    });
  } else {
    res.json({
      message: 'Unable to login',
      auth: false,
    });
  }
})


app.get("/auth", function (req, res) {
  if (req.session.user) {
    res.json({
      message: 'You are signed in!',
      auth: true,
    });
  }
  else {
    res.json({
      message: 'You are not logged in!',
      auth: false,
    });
  }
})


app.get("/auth/signout", (req, res) => {
  req.session.destroy(function (err) {
    res.json({
      auth: false,
    });
  });
});


app.listen(5000, function (req, res) {
  console.log("Server started at port 5000");
})
