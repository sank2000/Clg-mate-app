var express = require('express');
var router = express.Router();

const Material = require('../models/Material');
const User = require('../models/User');

router.get('/', (req, res) => {
  var query = Material.find({}).limit(6).sort({
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
  if(req.body.search)
  {
    var query = Material.find({subCode : req.body.search}).sort({
      'createdAt': 'desc'
     });
  }
  else
  {
    var query = Material.find({}).sort({
      'createdAt': 'desc'
     });
  }
  query.exec(function (err, result) {
    if (!err) {
       if(result.length != 0)
       {
        res.send(result);
       }
       else
       {
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
