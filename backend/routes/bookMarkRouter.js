const express = require("express");

//import controlles
const {
  addToBookMark,
  removeFromBookMark,
  getAllBookMarkTweets,
} = require("../controllers/bookMark");

//import authentication
const authentication = require("../middleware/authentication");

const bookMarkRouter = express.Router();

bookMarkRouter.post("/:id", authentication, addToBookMark);

bookMarkRouter.delete("/:id", authentication, removeFromBookMark);

bookMarkRouter.get("/", authentication, getAllBookMarkTweets);

//export bookMarkRouter
module.exports = bookMarkRouter;
