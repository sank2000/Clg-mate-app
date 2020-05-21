let express = require('express');
let router = express.Router();

const Material = require('./../models/material');
const User = require('./../models/User');

router.get('/', (req, res) => {
  if (!req.session.user) { res.send("unauthorised"); }
  let query = Material.find({}).limit(6).sort({
    'createdAt': 'desc'
  });
  query.exec(function (err, result) {
    if (err) { console.log(err); return; }
    res.send(result);
  })
});

router.post('/search', (req, res) => {
  if (!req.session.user) { res.send("unauthorised"); }
  let query;
  if (req.body.search) {
    query = Material.find({ title: { '$regex': req.body.search, $options: 'i' } }).sort({
      'createdAt': 'desc'
    });
  }
  else {
    query = Material.find({}).sort({
      'createdAt': 'desc'
    });
  }
  query.exec(function (err, result) {
    if (err) { console.log(err); return; }
    if (result.length != 0) {
      res.send(result);
    }
    else {
      res.send([]);
    }
  })
});

router.post("/full", function (req, res) {
  if (!req.session.user) { res.send("unauthorised"); }
  Material.find({}, function (err, result) {
    if (err) { console.log(err); return; }
    res.send(result);
  });
});

router.post("/new", function (req, res) {
  if (!req.session.user) { res.send("unauthorised"); }
  User.findById(req.session.user, function (err, result) {
    if (err) { console.log(err); return; }
    // console.log(req.body);

    const m = new Material({
      ...req.body,
      url: JSON.parse(req.body.url),
      subName: req.body.subName,
      postBy: result.name,
      postByType: result.type
    });
    // console.log(m);

    m.save(function (err) {
      if (err) { console.log(err); return; }
      res.redirect("../posts/new/success");
    });
  });
});

module.exports = router;
