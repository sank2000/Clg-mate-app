let express = require('express');
let router = express.Router();

const Material = require('../models/Material');
const User = require('../models/User');

router.get('/', (req, res) => {
  let query = Material.find({}).limit(6).sort({
    'createdAt': 'desc'
  });
  query.exec(function (err, result) {
    if (!err) {
      res.send(result);
    }
    else {
      console.log(err);
    }
  })
}
);

router.post('/search', (req, res) => {
  let query;
  if (req.body.search) 
  {
    query = Material.find({ title: {'$regex': req.body.search,$options:'i'}}).sort({
      'createdAt': 'desc'
    }); 
  }
  else {
    query = Material.find({}).sort({
      'createdAt': 'desc'
    });
  }
  query.exec(function (err, result) {
    if (!err) {
      if (result.length != 0) {
        res.send(result);
      }
      else {
        res.send([]);
      }
    }
    else {
      console.log(err);
    }
  })
}
);



router.post("/full", function (req, res) {
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
  User.findById(req.session.user, "name", function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      const m = new Material({
        ...req.body,
        subName: req.body.subName,
        postBy: result.name
      });
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
