const express = require("express");

//import controlles
const {
  createNewTweet,
  getAllTweets,
  getTweetById,
} = require("../controllers/tweets");

//import authentication middleware
const authentication = require("../middleware/authentication");
const tweetsRouter = express.Router();

tweetsRouter.post("/", authentication, createNewTweet);

tweetsRouter.get("/", authentication, getAllTweets);

tweetsRouter.get("/:id", authentication, getTweetById);

//export Router
module.exports = tweetsRouter;
