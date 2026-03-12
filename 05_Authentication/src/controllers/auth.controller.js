require("dotenv").config();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel.create({
    username,
    email,
    password,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token",token) //storing token value in cookie wiht name token

  res.status(200).json({
    message: "User registered successfully",
    token: token,
  });
};

module.exports = { registerUser };
