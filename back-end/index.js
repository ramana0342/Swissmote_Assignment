const mongoose = require("mongoose");
const express = require("express");
const cors=require("cors")
const app = express()
const port = 8080;
const dotenv = require("dotenv")

dotenv.config()

const userRoutes = require("./Views/userView")
const postRoutes = require("./Views/eventView")
const commentRoutes = require("./Views/commentView")


app.use(cors());
app.use(express.json());

app.use(userRoutes)
app.use(postRoutes)
app.use(commentRoutes)


mongoose.connect(process.env.MONGODB_URL).then(()=>{
         console.log("DB Atlas Connected")
})

app.listen(process.env.PORT,()=>{
         console.log(`Server Started Running On Port ${port}`)
})

