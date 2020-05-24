var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 5;

const User = require('../models/User');

router.get("/", function (req, res) {
  if (req.session.user) {
    User.findById(req.session.user, {password : 0}, function (err, result) {
      if (!err) {
        res.json({
          ...result._doc,
          message: 'You are signed in!',
          auth: true,
        });
      }
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
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const userData = new User({
      ...req.body,
      password: hash
    });
    userData.save()
      .then((result) => {
        req.session.user = userData._id;
        const {password , ...Data} = userData._doc;
        res.json({
          ...Data,
          message: 'Account created successfully.',
          auth: true,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.json({
            message: 'Error creating account : Account already exists',
            auth: false,
          });
        }
        else {
          res.json({
            message: 'Unable to create account : Error - ' + err.code,
            auth: false,
          });
        }
      });
  });
});

router.post("/signin", async (req, res) => {
  const { unique_id, password } = req.body;
  try {
    const user = await User.findOne({ unique_id });
    if (!user) {
      res.json({
        message: 'Unique ID not exits',
        auth: false,
      });
    }
    if (['locked', 'restricted'].includes(user.state)) {
      res.json({
        message: `Your account is ${user.state}, you can't login.`,
        auth: false,
      });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        req.session.user = user._id;
        const {password , ...Data} = user._doc;
        res.json({
          ...Data,
          message: `Welcome ${user.name}!`,
          auth: true,
        });
      }
      else {
        res.json({
          message: 'Incorrect Password',
          auth: false,
        });
      }
    });
  } catch (err) {
    console.log('Error: Mongo DB server rejected the request!' + err);
  }
});

router.get("/signout", (req, res) => {
  req.session.destroy(function (err) {
    res.json({
      auth: false,
    });
  });
});

router.get("/user", (req, res) => {
  if(req.session.user)
  {
    User.findById(req.session.user, {password : 0}, function (err, result) {
      if (!err) {
        res.json(result);
      }
    });
  }
  else
  { res.send("unauthorised"); }
  
})


router.get("/delete", (req, res) => {
  if(req.session.user)
  {
    User.findByIdAndDelete(req.session.user, function (err, docs) { 
      if (err){ 
          console.log(err);
          res.json({
            done    : false,
            message : "Unable to Delete "
          });
      } 
      else{ 
        req.session.destroy(function (err) {
          res.json({
            done    : true,
            message : "Deleted Successfully "
          });
        }); 
      } 
  });
  }
  else
  { res.send("unauthorised"); }
})

 

router.post("/update", (req, res) => {
  if(req.session.user)
  {
      User.findByIdAndUpdate(req.session.user, { name:req.body.name , email:req.body.email ,url : req.body.url }, function(err, result) {
      if (err) {
         console.log(err);
         res.json({
          done    : false,
          message : "Unable to update "
        });
      } 
      else
      {
        res.json({
          done    : true,
          message : "Updated Successfully "
        });
      }
      });
  }
  else
  { res.send("unauthorised"); }
});


router.post("/updatePassword", (req, res) => {
  if(req.session.user)
  {
      User.findById(req.session.user, function (err, result) {
      if (err) 
      {  
        console.log(err);
        res.json({
          message: 'Unable to Update Password',
          done : false,
        }); 
      }
      else
      {
        bcrypt.compare(req.body.currentpassword, result.password, function (err, result) {
          if (result) 
          {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) 
            {
              if (err) {
                console.log(err);
              } 
              else{
                User.findByIdAndUpdate(req.session.user, { password : hash }, function(err, result) {
                  if (err) {
                    console.log(err);
                  } 
                  else
                  {
                    res.json({
                      done    : true,
                      message : "Password Updated Successfully "
                    });
                  }
                  });
              }
            });
          }
          else {
            res.json({
              message: 'Incorrect Password',
              done : false,
            });
          }
        });
      }
    });
  }
  else
  { res.send("unauthorised"); }
});

module.exports = router;
