const express = require("express");
const router = express.Router();
const registerVal = require("../validation").registerVal;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// body parser
app.use(express.json());

const User = require("../models/User");

// get requset to /api/user
router.get("/", async (req, res) => {
  const list = await User.find().select("-password");

  res.json(list);
});

// REGISTER ROUTE

router.post("/register", async (req, res) => {
  // Lets validate the data before creating the User

  const { error } = registerVal(req.body);

  if (error) return res.status(400).json({ msg: error.details[0].message });

  // check if user email already exists
  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists) return res.status(400).json({ msg: "User already exists" });

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
    res.json({ savedUser });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//
//

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  const userExists = await User.findOne({
    email: req.body.email,
  });

  if (!userExists) return res.status(400).json({ msg: "Invalid credentials" });

  // user exists
  const unhashPass = await bcrypt.compare(
    req.body.password,
    userExists.password
  );

  if (!unhashPass) return res.status(400).json({ msg: "Invalid credentials" });

  // USER SUCCESSFULLY LOGGED IN

  const token = jwt.sign({ _id: userExists._id }, process.env.SECRET_TOKEN, {
    expiresIn: 3600, // time in seconds
  });

  res.header("auth-token", token).send(token);

  // res.send({ msg: "Login Successful" });
});

module.exports = router;
