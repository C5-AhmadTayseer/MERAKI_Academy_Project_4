const express = require("express");

//import controlles
const {
  getUserById,
  deleteUser,
  updateUserInfo,
} = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.get("/:id", getUserById);

usersRouter.delete("/:id", deleteUser);

usersRouter.put("/:id", updateUserInfo);

//export Router
module.exports = usersRouter;
