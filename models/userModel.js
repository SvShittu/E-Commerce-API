const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name: {type:String, 
        require: [true, "Please provide name"],
        minlenth: 3,
        maxlength: 50,

    },
    email: {
        type: String,
        unique: true,
        require: [true, "Please provide email"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide valid email"
        }
    },
    password: {
        type: String,
        require: [true, "Please provide password"],
        minlenth: 6,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    }
})


module.exports = mongoose.model("User", userSchema)

