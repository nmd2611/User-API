const express = require("express");
const router = express.Router();
const User = require("../models/User");

const app = express();

// body parser
app.use(express.json());

router.get("/", async (req, res) => {
  const id = await req.user._id;

  const found = await User.findOne({ _id: id }).select("-password");

  if (found) res.json({ found });
});

module.exports = router;
