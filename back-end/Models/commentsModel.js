

const mongoose = require("mongoose")
const { ObjectId } = mongoose;


const userCommentsSchema = new mongoose.Schema({

      
      content: {
          type:String,
          required:true
      },
      user_id :{
          type:ObjectId,
          ref:"User",
          required:true   
      },
      username :{
            type:String,
            ref:"User",
            required:true 
      },
      post_id :{
        type:ObjectId,
        ref:"Post",
        required:true 
      }},
      {
      timestamps: true
      }
    )


module.exports = mongoose.model("userCommentData",userCommentsSchema)