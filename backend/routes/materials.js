var express = require('express');
var router = express.Router();

const Material = require('../models/Material');
const User = require('../models/User');

router.get("/", function (req, res) {
  Material.find({}, function (err, result) {
    if (!err) {
      res.send(result);
    }
    else {
      console.log(err);
    }
  })
});

router.post("/new", function (req, res) {
  User.findById(req.session.user, "username", function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      const m = new Material(
        {
          ...req.body,
          postBy: result.username
        }
      );
      m.save(function (err) {
        if (err) {
          console.log(err);
        }
        else {
          res.redirect("../posts/new/success");
        }
      });
    }
  });
});

module.exports = router;
