const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

/**
 * - user register controller
 * - POST /api/auth/register
 */
const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const isExists = await userModel.findOne({ email });
    if (isExists) {
      return res.status(422).json({
        message: "User already exist with this mail",
        status: "false",
      });
    }
    const user = await userModel.create({
      email,
      password,
      name,
    });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookies("token",token);
    res.status(201).json({
        message:"User created successfully",
        user:{
            _id:user._id,
            email:user.email,
            name:user.name,
        },
        token,
        status:"true"
    })
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({
        message:"Error registering user",
        status:"false"
    })
  }
};

module.exports = { registerUser };
