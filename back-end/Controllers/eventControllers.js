
const eventsData = require("../Models/userPostEventModel")
const jwt = require("jsonwebtoken")
const commentsData = require("../Models/commentsModel")
const dotenv = require("dotenv")

dotenv.config()


const createEventController = async(req,res)=>{

      try{
        //console.log(req.body)
        let token = req.headers.authorization;
       // console.log(token)
        let tokenResult = jwt.verify(token,process.env.Token_Key);
      //  console.log("123")
       // console.log(tokenResult)
        let  createNewEvent = new eventsData({...req.body , user_id :tokenResult.userID})
        let  newEventResult = await createNewEvent.save();
        //console.log(newEventResult)
        return res.status(201).json({
          newEventResult
        })
        
      } catch (err){
        res.status(500).json({ error: "Internal server error",
                                err
         });
      }

}

const getAllEventsDataController = async(req,res)=>{
             
      try{
             let allEventsData= await eventsData.find({})
             let allCommentsData = await commentsData.find({})
             return res.status(201).json({
                   allEventsData,
                   allCommentsData
      })
       } catch (err){
        res.status(500).json({ error: "Internal server error",
          err
});
       }
}

const getUserEventsDataController  = async(req,res)=>{
  try{
  let token = req.headers.authorization;
  let tokenResult = jwt.verify(token,process.env.Token_Key);

  let  userEventsData = await eventsData.find({user_id :tokenResult.userID})
  return res.status(201).json({
    userEventsData 
})
    
  } catch(err){
    res.status(500).json({ error: "Internal server error",
                            err
})
  }
}

const deleteUserEventController = async(req,res)=>{
  try{
    let eventID = req.params.id
    let  deleteEventDataData = await eventsData.findByIdAndDelete(eventID)
    return res.status(201).json({
      deleteEventDataData
  })
}  catch(err){
  res.status(500).json({ error: "Internal server error",
                          err
})
}
}

const editUserEventController = async(req,res)=>{
              try{
               // console.log(req.body)
                const { _id, eventName, eventDescription } = req.body;
                await eventsData.findByIdAndUpdate(_id, { eventName, eventDescription })
                
                let editedeventData = await eventsData.findById(_id)
               // console.log(editedPostData)
                return res.status(201).json({
                  editedeventData
              })

              } catch (err){
                res.status(500).json({ error: "Internal server error",
                  err
                 })
              }    
}







module.exports = {
                   createEventController , 
                   getAllEventsDataController ,
                   getUserEventsDataController,
                   deleteUserEventController,
                   editUserEventController 
                  }