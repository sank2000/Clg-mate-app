var express = require('express');
var router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User');

router.get('/', (req, res) => {
  console.log("Requesting...");
  Post.find({}, function (err, result) {
    if (!err) {
      res.send(result);
    }
    else {
      console.log(err);
    }
  })
}
);


router.post("/new", function (req, res) {
  User.findById(req.session.user, "username", function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      const newPost = new Post({
        title: req.body.title,
        author: result.username,
        description: req.body.description,
        subName: req.body.subName,
        postType: req.body.postType,
        dueDate: new Date(req.body.dueDate),
        file: req.body.file,
        url: req.body.url,
      });

      newPost.save(function (err) {
        if (err) {
          console.log(err);
        }
        else {
          res.redirect("./new/success");
        }
      });
    }
  });
})



module.exports = router;
