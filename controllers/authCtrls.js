const User = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const register = async(req, res) => {
    try {
    const{name, email, password } = req.body
    if(!name || !email || !password){
        return res.status(400).json({message: "All fields are required"})
    }
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({message: "User already exists"})
    }

    const hashedPassword = await bcryptjs.hash(password, 12)
// first registered user is an admin
const isFirstAccount = await User.countDocuments({}) === 0
const role = isFirstAccount? "admin" : "user"
    const user = new User({
        name,
        email,
        password: hashedPassword,
        role
    })
    await user.save()
    return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    })
} catch (error) {
    return res.status(500).json({message: error.message})
}}
const login = async(req, res)=>{
    res.send("login user")
}

const logout = async(req, res) =>{
    res.send("logout user")
}

module.exports = {
    register,
     login,
      logout
}  