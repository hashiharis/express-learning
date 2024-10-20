const express = require("express");
const {
  signup,
  signin,
  getAllUsers,
  getUserById,
  editUserDetails,
  deleteUserById,
} = require("../controller/user.controller");
const {
  usignup,
  usignin,
  updatePassword,
  updateProfile,
  deleteUser,
  getUser,
} = require("../controller/userdb.controller");
const { validateEmail } = require("../middlewares/validateEmail");
const validateRequiredFields = require("../middlewares/validateRequiredFields");
const { validatePassword } = require("../middlewares/validatePassword");
const {
  validateEmailPasswordRequired,
} = require("../middlewares/validateEmailPasswordRequired");
const userRouter = express.Router();

// userRouter.get('/new',(req,res)=>{
//     res.send("New user router")
// })

userRouter.post(
  "/signup",
  validateRequiredFields,
  validateEmail,
  validatePassword,
  usignup
);

userRouter.post(
  "/signin",
  validateEmailPasswordRequired,
  validateEmail,
  validatePassword,
  usignin
);

userRouter.get("/:id", getUser);

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUserById);

userRouter.patch("/:id", editUserDetails);
userRouter.patch("/updatePassword/:id", updatePassword);
userRouter.patch("/updateProfile/:id", updateProfile);

// userRouter.delete("/:id",deleteUserById);
userRouter.delete("/:id", deleteUser);
module.exports = userRouter;
