const express = require("express");
const route = express.Router();


const {registerController,loginController} = require("../Controllers/userControllers")


route.post("/userSignUp",registerController)

route.post("/userLogin",loginController)



module.exports = route