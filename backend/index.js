const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Import Routers
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const tweetsRouter = require("./routes/tweetsRouter");
const usersRouter = require("./routes/usersRouter");
const bookMarkRouter = require("./routes/bookMarkRouter");
const likesRouter = require("./routes/likes");
const reTweetRouter = require("./routes/reTweet");



// Routes Middleware
app.use("/register" , registerRouter)
app.use("/login" , loginRouter)
app.use("/users" , usersRouter)
app.use("/tweets" , tweetsRouter)
app.use("/bookMark" , bookMarkRouter)
app.use("/likes" , likesRouter)
app.use("/retweet" ,reTweetRouter)
// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
