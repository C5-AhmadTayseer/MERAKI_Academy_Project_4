const express = require("express")

//import controlles  
const register = require("../controllers/register")

const registerRouter = express.Router()

registerRouter.post("/" , register)


//export Router 
module.exports = registerRouter