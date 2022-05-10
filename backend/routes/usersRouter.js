const express = require("express");

//import controlles
const getUserById = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.get("/:id", getUserById);

//export Router
module.exports = usersRouter;
