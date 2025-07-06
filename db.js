const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const URL = process.env.MONGODB_URL

const connectDB = async()=>{
   await mongoose.connect(`${URL}`)
   .then(()=>{
    console.log("MongoDB CONNECTED")
   })
}

module.exports = connectDB