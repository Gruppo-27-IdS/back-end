const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Per criptare la password

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 25,
  },
  name: {
    type: String,
    required: true,
    min: 3,
    max: 25,
  },
  surname: {
    type: String,
    required: true,
    min: 3,
    max: 25,
  },
  age: {
    type: Number,
    required: true,
    min: 10,
    max: 150,
  },
  phone: {
    type: String,
    required: true,
    min: 6,
    max: 14,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 25,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 25,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.statics.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.checkPassword = async function (password) {
  const hasCapitalLetter = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  console.log(password);
  console.log(hasCapitalLetter, hasSpecialChar, hasNumber);
  return (hasCapitalLetter && hasSpecialChar && hasNumber);
};

module.exports = mongoose.model("User", userSchema);
