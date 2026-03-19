const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required for creating a user"],
      trim: true,
      lowercase: true,
      unique: [true, "Email already exists, please use another email"],
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please fill a valid email address",
      ], //email validation regex,google it later
    },
    name: {
      type: String,
      required: [true, "Name is required for creating a user"],
    },
    password: {
      type: String,
      required: [true, "Password is required for creating a user"],
      minLength: [6, "Password must be at least 6 characters long"],
      select: false, //to exclude password field when fetching user data
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
        return next();
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return next();
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model("user",userSchema);
module.exports = userModel;