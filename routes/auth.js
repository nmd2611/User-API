const express = require("express");
const router = express.Router();
const registerVal = require("../validation").registerVal;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// REGISTER ROUTE

router.post("/register", async (req, res) => {
  // Lets validate the data before creating the User

  const { error } = registerVal(req.body);

  if (error) res.status(400).send(error.details[0].message);

  // check if user email already exists
  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists) return res.status(400).send("User already exists");

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  const u = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPass,
  });

  try {
    const savedUser = await u.save();
    console.log("enetred");
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

//
//

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  const userExists = await User.findOne({
    email: req.body.email,
  });

  if (!userExists) res.status(400).send({ message: "Invalid credentials" });

  // user exists
  const unhashPass = await bcrypt.compare(
    req.body.password,
    userExists.password
  );

  if (!unhashPass) res.status(400).send("Invalid credentials");

  // USER SUCCESSFULLY LOGGED IN

  const token = jwt.sign({ _id: userExists._id }, process.env.SECRET_TOKEN);

  res.header("auth-token", token).send(token);

  res.send({ message: "Login Successful" });
});

module.exports = router;
