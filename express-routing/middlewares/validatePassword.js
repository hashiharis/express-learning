const UserModel = require("../model/user.model");

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be atleast 8 characters long" });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }

  next();
};

module.exports = { validatePassword };
