const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")

const  usersData= require("../Models/userModel")

const dotenv = require("dotenv")

dotenv.config()

const registerController= async(req,res)=>{

    let {Name,Email,Password} = req.body;
    //console.log(req.body)
try{
      
     if(Name&&Email&&Password){
            //console.log(req.body)
               let existUserEmail = await usersData.findOne({email:Email});
               let existUserName = await usersData.findOne({username:Name});
        if(existUserEmail==null && existUserName == null){
           //  console.log("123")
               let encryptPassword= bcrypt.hashSync(Password,10);
               //req.body.Password = encryptPassword
               let user=new usersData({username:Name,email:Email,password:encryptPassword});
               let userDetails =await user.save();
              // console.log(userDetails)
  
               return  res.status(201).json({
               Success : "User Stored in DB",
               userDetails
               })
        }else{
              return res.status(400).json({
              ERROR:"Already Hava An Account with This Email ID or UserName"
              })
        }
    }else{
       return res.status(400).json({
         ERROR:"Enter All Details"
       })
    }
} catch (error) {
        return res.status(500).json({ error: "Internal server error" });
  }

}

const loginController = async(req,res)=>{
      
  let {Email,Password} = req.body;
            try {
                  if(Email&&Password){
                         let userDetails= await usersData.findOne({email:Email});
                         if(userDetails==null){
                              return res.status(400).json({
                                  Error:"No User is  Registered with this Email"
                               })
                           }
                        let passwordResult  = bcrypt.compareSync(Password,userDetails.password);
                        if(passwordResult == false){
                               return res.status(400).json({
                               Error:"Incorrect password"
                             })
                           }

                  let token = jwt.sign({userID:userDetails._id,userName:userDetails.username},process.env.Token_Key)
                          return res.status(201).json({
                         Success : "Login Success",
                         Token : token
                        })

            }else{
              return res.status(400).json({
                Error:"Enter All Details"
                    })
            } 
  }catch (err){
    return res.status(500).json({ error: "Internal server error" });   
}
}



module.exports = {registerController,loginController}