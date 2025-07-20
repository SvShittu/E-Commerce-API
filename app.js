// express

const express = require("express")
const dotenv = require("dotenv").config()
const connectDB = require("./db")
const app = express()
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/authRoutes")
app.use(morgan("tiny"))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))


connectDB()
// middleware
app.get("/", (req, res) => {
    res.send("e-commerce api")
})
app.get("/api/v1", (req, res)=>{
    //console.log(req.cookies)
    console.log(req.signedCookies)
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