const express = require("express");

//import controlles (tweets Controller)
const {
  createNewTweet,
  getAllTweets,
  getTweetById,
  updateTweet,
  deleteTweetById,
  getAllTweetByUser,
} = require("../controllers/tweets");

//import (comments Controller)
const createNewComment = require("../controllers/comments");

//import authentication middleware
const authentication = require("../middleware/authentication");

const tweetsRouter = express.Router();

tweetsRouter.post("/", authentication, createNewTweet);

tweetsRouter.get("/", authentication, getAllTweets);

tweetsRouter.get("/:id", authentication, getTweetById);

tweetsRouter.put("/:id", authentication, updateTweet);

tweetsRouter.delete("/:id", authentication, deleteTweetById);

tweetsRouter.get("/user/:id", authentication, getAllTweetByUser);

tweetsRouter.post("/:id/comments", authentication, createNewComment);



//export Router
module.exports = tweetsRouter;
