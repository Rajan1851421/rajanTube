const express = require('express')
const cors = require('cors')
const app= express()
const mongoose = require('mongoose');
require('dotenv').config()
app.use(cors())
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const userRoute = require('./routes/user.js')
const videoRoute = require('./routes/video.js')
const commentRoute = require('./routes/comment.js')



// database connection
const conncetionWithDatabase =async()=>{
    try {
        const response = await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Connected with Database")
    } catch (error) {
        console.log(error)
    }
}
conncetionWithDatabase()

app.use(bodyParser.json())

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// ALL user routes
app.use("/user",userRoute)
app.use("/video",videoRoute)
app.use("/comment",commentRoute)



module.exports=app