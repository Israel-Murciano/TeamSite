const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load User model
const user = require("../../config/user.model");

// Jenkins config
const jenkinsapi = require("jenkins-api");
const jenkins = jenkinsapi.init("http://User:Password@MainServer:81");

// Email Route
router.post("/emailUser", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  user.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "username already exists" });
    } else {
      jenkins.build_with_params(
        "Send Mail",
        {
          depth: 1,
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          token: "RegisterApprove"
        },
        function(err, data) {
          if (err) {
            return console.log("TEST " + err);
          }
          res.send("done");
        }
      );
    }
  });
});

router.post("/register", (req, res) => {
  //Form Validation

  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  user.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "username already exists" });
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
      });
      //Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//Form Validation
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  //Find user by username
  user.findOne({ username }).then(user => {
    //Check if user exists
    if (!user) {
      return res.status(404).json({ usernamenotfound: "username not found" });
    }
    //Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched
        //Create user payload
        const payload = {
          id: user.id,
          username: user.username,
          role: user.role
        };
        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 //1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});


module.exports = router;
