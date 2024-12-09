const Company = require("../models/Company");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await Company.findOne({ email });
    if (!validUser) return next(new Error("User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(new Error("Wrong Credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: hashPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // for one hour
    res
      .cookie("access_token", token, {
        sameSite: "none",
        secure: true,
        expires: expiryDate,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signed out successfully");
};

module.exports = { login, signout };
