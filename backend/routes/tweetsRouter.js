const express = require("express");

//import controlles
const {
  createNewTweet,
  getAllTweets,
  getTweetById,
  updateTweet,
  deleteTweetById,
} = require("../controllers/tweets");

//import authentication middleware
const authentication = require("../middleware/authentication");
const tweetsRouter = express.Router();

tweetsRouter.post("/", authentication, createNewTweet);

tweetsRouter.get("/", authentication, getAllTweets);

tweetsRouter.get("/:id", authentication, getTweetById);

tweetsRouter.put("/:id" , authentication , updateTweet )

tweetsRouter.delete("/:id" , authentication ,deleteTweetById )

//export Router
module.exports = tweetsRouter;
