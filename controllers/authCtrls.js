const User = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const register = async(req, res) => {
    try {
    const{name, email, password, role } = req.body
    if(!name || !email || !password){
        return res.status(400).json({message: "All fields are required"})
    }
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({message: "User already exists"})
    }

    const hashedPassword = await bcryptjs.hash(password, 12)

    const user = new User({
        name,
        email,
        password: hashedPassword,
    })
    await user.save()
    return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: hashedPassword,
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