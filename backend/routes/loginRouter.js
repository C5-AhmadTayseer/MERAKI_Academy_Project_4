const express = require("express")

//import controlles  
const login = require("../controllers/login")

const loginRouter = express.Router()

loginRouter.post("/" , login)

//export Router 
module.exports = loginRouter