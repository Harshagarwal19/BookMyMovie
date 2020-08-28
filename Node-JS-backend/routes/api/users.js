const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");// Load User model
const User = require("../../models/User");
const Booking = require("../../models/Booking")



// @route POST api/users/register
// @desc Register user
// @access Public

router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);// Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          photo: req.body.photo
        });// Hash password before saving in database
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
  router.post("/get_booking", (req, res) => {
      console.log("IN GET BOOKING");
    Booking.find({ email: req.body.email }).then(users => {

      console.log(users);
      return res.json(users);
    });
  });

  router.post("/register_movie", (req, res) => {
    // Form validation

        const newBook = new Booking({
          movie: req.body.movie,
          email: req.body.email,
          day: req.body.day,
          time: req.body.time,
          code: req.body.code
        });// Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            newBook
              .save()
              .then(user => res.json({
                success: true,}))
              .catch(err => console.log(err));
;
        });
        console.log("HI MOVIE IN DATBASE");

  });

// @route POST api/users/register
// @desc Register user
// @access Public


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    console.log("IN LOGIN");
    const { errors, isValid } = validateLoginInput(req.body);// Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }const email = req.body.email;
    const password = req.body.password;// Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }// Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };// Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                photo: user.photo,
                id:user.id,
                email:user.email

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