const express = require("express");
const router = express.Router();
const gravatar = require("gravatar"); //profile image
const bcrypt = require("bcryptjs"); //encryption
const jwt = require("jsonwebtoken"); //jwt token for login
const keys = require("../../config/keys");
const passport = require("passport"); //passport for validation
//load input validation for login and register
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

// Register users into database
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //check validation
  if (!isValid) {
    //error check
    return res.status(400).json(errors);
  }
  User.findOne({
    //mongoose method findone
    email: req.body.email
  }).then(user => {
    if (user) {
      //check to see if email is already in use
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      //user image
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });
      //database value set up
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      //Password Encryption using bcrypt
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

//Login user and return jwt token
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  //find user by Email
  User.findOne({
    email
  }).then(user => {
    //check for users
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user matched
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        }; //create jwt payload
        //sign token
        jwt.sign(
          payload,
          keys.Key,
          {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// Return current user jwt token
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
module.exports = router;
