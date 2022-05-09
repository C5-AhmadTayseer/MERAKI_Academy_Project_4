const express = require("express");

//import controlles
const { createNewTweet } = require("../controllers/tweets");

//import authentication middleware
const authentication = require("../middleware/authentication");
const tweetsRouter = express.Router();

tweetsRouter.post("/", authentication, createNewTweet);

//export Router
module.exports = tweetsRouter;
