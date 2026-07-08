const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "FullName is required!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required!"],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter valid email address."],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
