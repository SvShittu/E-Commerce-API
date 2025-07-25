const express = require("express")
const router = express.Router() 
const  {getAllUsers,
getSingleUser,
showCurrentUser,
updateUser,
updateUserPassword} = require("../controllers/userCtrls")


router.route("/").get(getAllUsers)
router.route("/showMe").get(getAllUsers)
router.route("/updateUser").post(updateUser)
router.route("/updateUserPassword").post(updateUserPassword)
router.route("/:id").get(getSingleUser)
module.exports = router   