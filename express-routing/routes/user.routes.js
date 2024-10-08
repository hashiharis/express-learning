const express = require("express");
const { signup, signin, getAllUsers, getUserById, editUserDetails, deleteUserById } = require("../controller/user.controller");
const userRouter = express.Router();

// userRouter.get('/new',(req,res)=>{
//     res.send("New user router")
// })



userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUserById);

userRouter.patch("/:id",editUserDetails);

userRouter.delete("/:id",deleteUserById);
module.exports = userRouter;
