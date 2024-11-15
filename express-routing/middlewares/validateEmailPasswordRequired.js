const validateEmailPasswordRequired = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Please enter email and password" });
  }
  next();
};

module.exports = { validateEmailPasswordRequired };
