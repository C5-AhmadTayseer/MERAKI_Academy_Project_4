const express = require("express");

//import controlles
const {
  getUserById,
  deleteUser,
  updateUserInfo,
} = require("../controllers/users");

//follow Controller
const { follow, unFollow } = require("../controllers/follow");



//authentication
const authentication = require("../middleware/authentication");

const usersRouter = express.Router();

usersRouter.get("/:id", getUserById);

usersRouter.delete("/:id", deleteUser);

usersRouter.put("/:id", updateUserInfo);

usersRouter.post("/:id/follow", authentication, follow);

usersRouter.delete("/:id/follow", authentication, unFollow);

//export Router
module.exports = usersRouter;
