const UserModel = require("../model/user.model");

const validateRequiredFields = async (req, res, next) => {
  const { name, email, password, age } = req.body;

  if (!name || !email || !password || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};

module.exports = validateRequiredFields;
