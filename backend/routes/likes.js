const express = require("express");
const { addToLike, deleteFromLike, getAllLikedTweet } = require("../controllers/likes");

//import controlleres
const authentication = require("../middleware/authentication");

const likesRouter = express.Router();

likesRouter.post("/:id", authentication, addToLike);

likesRouter.delete("/:id", authentication, deleteFromLike);

likesRouter.get("/:id" , authentication , getAllLikedTweet)

//exportRouter ,
module.exports = likesRouter;
