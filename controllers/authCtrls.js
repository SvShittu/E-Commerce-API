const User = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const{attachCookiesToResponse} = require("../utils/index")
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

    //const hashedPassword = await bcryptjs.hash(password, 12)
// first registered user is an admin
const isFirstAccount = await User.countDocuments({}) === 0
const role = isFirstAccount? "admin" : "user"
    const user = new User({
        name,
        email,
        //password: hashedPassword,
        password,
        role

    })
    await user.save()
    const tokenUser = {name:user.name, userId: user._id, role: user.role}
   attachCookiesToResponse({res, user: tokenUser})
    // const token = createJWT({payload: tokenUser})

   // const token = jwt.sign(tokenUser, "jwtSecret", {expiresIn :"1d"})
  
//Sending response after setting the cookie
//   return res.status(201).json({
//     user: tokenUser,
//      token
//      })

} catch (error) {
    return res.status(500).json({message: error.message})

    
}}
//login
const login = async(req, res)=>{
    const{email, password} = req.body
    if(!email || !password){
        res.status(400).json({message: "Please provide email and password"})
        }
     const user = await User.findOne({email})
     if(!user){
        res.status(401).json({message:"User do not exist"})
     
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        res.status(401).json({message: "Invalid Credentials"})
    }
    const tokenUser = {name: user.name, userId: user._id, role: user.role}
    attachCookiesToResponse({res, user: tokenUser})
    res.status(201).json({user: tokenUser})

   }
//logout
const logout = async(req, res) =>{
    res.cookie("token", "logout",{
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 1000),
    })
    res.status(200).json({message: "User logged out"})
}

module.exports = {
    register,
     login,
      logout
}  