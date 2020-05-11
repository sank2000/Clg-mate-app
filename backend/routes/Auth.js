var express = require('express');
var router = express.Router();

const User = require('../models/User');

router.get("/", function (req, res) {
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

router.post("/signup", function (req, res) {
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
});

router.post("/signin", async (req, res) => {
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
});

router.get("/signout", (req, res) => {
  req.session.destroy(function (err) {
    res.json({
      auth: false,
    });
  });
});

module.exports = router;
