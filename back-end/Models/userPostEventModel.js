
const mongoose = require("mongoose")
const { ObjectId } = mongoose;


const userPostEventSchema = new mongoose.Schema({

      eventName :{
          type:String,
          required:true
      },
      eventDescription : {
          type:String,
          required:true
      },
      eventImage : {
            type: String,
            required:false
      },
      user_id :{
          type:ObjectId,
          ref:"User",
          required:true   
      }},
      {
      timestamps: true
      }
    )


module.exports = mongoose.model("usersPostEventData",userPostEventSchema)