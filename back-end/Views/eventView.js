const express = require("express")
const route = express.Router()

const {createEventController,
       getAllEventsDataController , 
       getUserEventsDataController  , 
       deleteUserEventController,
       editUserEventController }      = require("../Controllers/eventControllers")


route.post("/createEvent",createEventController)

route.get("/getAllEventsData",getAllEventsDataController)

route.get("/getLoginUserEventsData",getUserEventsDataController)

route.delete("/deleteUserEvent/:id",deleteUserEventController)

route.put("/editUserEvent",editUserEventController)



module.exports = route