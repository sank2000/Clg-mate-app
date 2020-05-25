const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User');

const today = new Date();
const oneDay = 86400000;
const yesterday = new Date(today - oneDay);

router.get('/', (req, res) => {
  if (!req.session.user) { res.send("unauthorised"); }
  var query = Post.find({ dueDate: { $gte: yesterday } }).limit(6).sort({
    'dueDate': 'asc'
  });
  query.exec(function (err, result) {
    if (err) { console.log(err); return; }
    res.send(result);
  });
});

router.post("/expired", function (req, res) {
  if (!req.session.user) { res.send("unauthorised"); }
  if (req.body.type === "All") {
    var query = Post.find({ dueDate: { $lt: new Date().setHours(0, 0, 0, 0) } }).sort({ 'dueDate': 'desc' });
  } else {
    var query = Post.find({ postType: req.body.type }).sort({ 'dueDate': 'desc' });
  }
  query.exec(function (err, result) {
    if (err) { console.log(err); return }
    res.send(result);
  });
});

router.post("/full", function (req, res) {
  if (!req.session.user) { res.send("unauthorised"); }
  if (req.body.type === "All") {
    var query = Post.find({}).sort({ 'dueDate': 'desc' });
  } else {
    var query = Post.find({ postType: req.body.type }).sort({ 'dueDate': 'desc' });
  }
  query.exec(function (err, result) {
    if (err) { console.log(err); return }
    res.send(result);
  });
});

router.post("/new", function (req, res) {
  if (!req.session.user) { res.send("unauthorised"); }
  User.findById(req.session.user, function (err, result) {
    if (err) { console.log(err); return; }
    const newPost = new Post({
      title: req.body.title,
      author: result.name,
      authorType: result.type,
      description: req.body.description,
      subName: req.body.subName,
      postType: req.body.postType,
      dueDate: new Date(req.body.dueDate),
      file: req.body.file,
      url: JSON.parse(req.body.url),
    });

    newPost.save(function (err) {
      if (err) { console.log(err); return; }
      res.redirect("./new/success");
    });
  });
});


router.post("/delete", function (req, res) {
  if (!req.session.user) { res.send("unauthorised"); }
  User.findByIdAndDelete(req.body.id, function (err, docs) { 
    if (err){ 
        console.log(err);
        res.json({
					deleted : false
				}); 
    } 
    else{ 
      res.json({
        deleted : true
      }); 
    } 
}); 
});




module.exports = router;
