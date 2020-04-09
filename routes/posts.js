const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  const id = await req.user._id;

  const found = await User.findOne({ _id: id });

  if (found) res.send(found.name);
});

module.exports = router;
