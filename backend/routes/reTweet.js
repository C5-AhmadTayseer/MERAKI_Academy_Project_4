const express = require("express");
const { addToRetweet , deleteFromRetweet, getAllRetweetTweet} = require("../controllers/reTweet");

//import controlleres
const authentication = require("../middleware/authentication");

const reTweetRouter = express.Router();

reTweetRouter.post("/:id", authentication , addToRetweet);

reTweetRouter.delete("/:id", authentication , deleteFromRetweet );

reTweetRouter.get("/:id" , authentication , getAllRetweetTweet)

//exportRouter ,
module.exports = reTweetRouter;
