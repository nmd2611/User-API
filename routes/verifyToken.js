const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    if (verified) req.user = verified;
  } catch (err) {
    res.status(400).send("invalid token");
  }
  next();
};

module.exports = auth;
