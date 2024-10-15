const express = require("express");
const { signup, signin, getAllUsers, getUserById, editUserDetails, deleteUserById } = require("../controller/user.controller");
const { usignup, usignin, updatePassword ,updateProfile, deleteUser} = require("../controller/userdb.controller");
const userRouter = express.Router();

// userRouter.get('/new',(req,res)=>{
//     res.send("New user router")
// })



userRouter.post("/signup", usignup);

userRouter.post("/signin", usignin);

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUserById);

userRouter.patch("/:id",editUserDetails);
userRouter.patch("/updatePassword/:id",updatePassword)
userRouter.patch("/updateProfile/:id",updateProfile)

// userRouter.delete("/:id",deleteUserById);
userRouter.delete("/:id",deleteUser);
module.exports = userRouter;
