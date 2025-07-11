// express

const express = require("express")
const dotenv = require("dotenv").config()
const connectDB = require("./db")
const app = express()
const morgan = require("morgan")
const authRoutes = require("./routes/authRoutes")
app.use(morgan("tiny"))
app.use(express.json())


connectDB()
// middleware

app.get("/", (req, res)=>{
    res.send("e-commerce api")
}) 

app.use("/api/v1/auth", authRoutes)
const PORT = process.env.PORT || 5000
const start = async() => {
    try {
        
        app.listen(PORT, console.log(`Server is running on port ${PORT}...`))
    } catch (error) {
    console.log(error)
    }
}

start()