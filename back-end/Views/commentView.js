const express = require("express")
const route = express.Router()

const {postCommentController} = require("../Controllers/commetnControllers")


route.post("/postComment/:id",postCommentController)



module.exports = route
