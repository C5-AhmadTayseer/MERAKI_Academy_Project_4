const express = require("express")


//import controlles
const { addToBookMark } = require("../controllers/bookMark")


//import authentication 
const authentication = require("../middleware/authentication")



const bookMarkRouter = express.Router()


bookMarkRouter.post("/:id" , authentication , addToBookMark)


//export bookMarkRouter 
module.exports = bookMarkRouter