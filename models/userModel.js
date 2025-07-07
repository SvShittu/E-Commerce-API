const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {type:String, 
        require: [true, "Please provide name"],
        minlenth: 3,
        maxlength: 50,

    },
    email: {
        type: String,
        require: [true, "Please provide email"],
        minlenth: 3,
        maxlength: 50,
    }

})

