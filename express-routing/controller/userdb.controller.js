const UserModel = require("../model/user.model");
const usignup = async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;

    let newUser;

    if (role) {
      // creating a new document and saving
      newUser = new UserModel({
        role,
        name,
        email,
        password,
        age,
      });
    } else {
      newUser = new UserModel({
        name,
        email,
        password,
        age,
      });
    }

    await newUser.save();
    return res
      .status(201)
      .json({ message: "Registration successful", data: newUser });
  } catch (error) {
    console.log("Signup error", error);
    return res.status(500).json({ message: "Server error" });
  }
};
const usignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await UserModel.findOne({ email });

    if (!userFound) {
      return res
        .status(400)
        .json({ message: "Incorrect email id and password" });
    }

    if (userFound.password !== password) {
      return res
        .status(400)
        .json({ message: "Incorrect email id and password" });
    }
    const userFoundCopy = userFound.toObject();
    delete userFoundCopy.password;
    console.log(userFound);
    return res
      .status(200)
      .json({ message: "Login successful", user: userFoundCopy });
  } catch (error) {
    console.log("Sign In error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    const userFound = await UserModel.findById(id);
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    if (userFound.password === newPassword) {
      return res
        .status(400)
        .json({ message: "New password cannot be the same as old password" });
    }

    userFound.password = newPassword;

    await userFound.save();

    return res
      .status(200)
      .json({ message: "password updated", updated: userFound });
  } catch (error) {
    console.log("password updation error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { newName, newEmail } = req.body;

    if (!newEmail) {
      return res.status(400).json({ message: "New email is required" });
    }
    if (!newName) {
      return res.status(400).json({ message: "New name is required" });
    }

    const userWithNewEmail = await UserModel.findByIdAndUpdate(
      id,
      { email: newEmail, name: newName },
      { new: true }
    );

    if (!userWithNewEmail) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile details updated",
      updatedProfileDetails: userWithNewEmail,
    });
  } catch (error) {
    console.log("Error on profile updation", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await UserModel.findByIdAndDelete(id);
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User deleted succesfully", deletedUser: userFound });
  } catch (error) {
    console.log("Error on user deletion", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await UserModel.findById(id);
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }
    const userDataCopy = userFound.toObject();

    delete userDataCopy.password;
    return res
      .status(200)
      .json({ message: "User details fetched", userData: userDataCopy });
  } catch (error) {
    console.log("Error on fetching user details", error);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  usignup,
  usignin,
  updatePassword,
  updateProfile,
  deleteUser,
  getUser,
};
