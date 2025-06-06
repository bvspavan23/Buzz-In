const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const admins = {
  register: asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("Please all fields are required");
    }
    const userExists = await Admin.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const dbUser = await Admin.create({
      email,
      name,
      password: hashedPassword,
    });
    res.json({
      name: dbUser.name,
      email: dbUser.email,
      id: dbUser._id,
    });
  }),
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //!check if email is valid
    const user = await Admin.findOne({ email });
    if (!user) {
      throw new Error("Invalid login credentials");
    }
    //! Compare the user password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid login credentials");
    }
    //! Generate a token
    const token = jwt.sign({ id: user._id }, "appadam", {
      expiresIn: "5h",
    });
    //!Send the response
    res.json({
      message: "Login Success",
      token,
      id: user._id,
      email: user.email,
      name: user.name,
      Buzzes: user.Buzzes,
    });
  }),
};
module.exports = admins;
