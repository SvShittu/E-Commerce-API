const User = require("../models/userModel")





const getAllUsers = async(req, res) => {
     const users = await User.find({role: "user"}).select("-password")
    res.status(200).json({users}) 
}


const getSingleUser = async(req, res) => {
     const user = await User.findOne({_id:req.params.id}).select("-password")
if(!user){
     res.status(404).json({message: `No user with id: ${req.params.id}`})
}
}


const showCurrentUser = async(req, res) => {
     res.send("show current user")
}

const updateUser = async(req, res) => {
     res.send("update user")
}
//updated User password
const updateUserPassword = async(req, res) => {
     res.send("update user password")
}


module.exports = {
getAllUsers,
getSingleUser,
showCurrentUser,
updateUser,
updateUserPassword
}
