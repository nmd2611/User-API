const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const auth = require("./routes/verifyToken");
const posts = require("./routes/posts");

const app = express();

// body parser
app.use(express.json());

// connect to db
dotenv.config();
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to db");
  }
);

// import route
const authRoute = require("./routes/auth");

// Route middleware
app.use("/api/user", authRoute);
app.use("/api/posts", auth, posts);

app.listen(5000, () => {
  console.log(`Server running at port 5000 ....`);
});
