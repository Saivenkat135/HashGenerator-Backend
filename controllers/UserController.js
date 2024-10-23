const bcrypt = require("bcrypt");

const User = require("../models/UserModel.js");
const asyncMiddleware = require("../middleware/catchAsyncErrors");
const HashModel = require("../models/HashModel.js");

exports.UserRegistration = asyncMiddleware(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const verifyEmail = await User.findOne({ Email: email });
    if (verifyEmail) {
      return res
        .status(200)
        .json({ success: false, message: "email already exists" });
    }
    const saltrounds = 10;
    const HashedPassword = await bcrypt.hash(password, saltrounds);
    const newUser = new User({
      name: name,
      email: email,
      password: HashedPassword,
    });
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "Registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.log("Internal server error", error);
  }
});

exports.userLogin = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;
  try {
    const VerifyEmail = await User.findOne({ email: email });
    if (!VerifyEmail) {
      return res
        .status(404)
        .json({ success: false, message: "User doesnot exists" });
    }
    const VerifyPassword = await bcrypt.compare(password, VerifyEmail.password);
    if (!VerifyPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Password" });
    }
    return res.status(201).json({
      success: true,
      message: "login successfully",
      data: VerifyEmail,
    });
  } catch (error) {
    console.log("internal server error ", error);
  }
});

exports.UserDashboard = asyncMiddleware(async (req, res) => {
  const { email } = req.body;
  try {
    const VerifyEmail = await User.findOne({ email: email });
    if (!VerifyEmail) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const UserData = await HashModel.find({ email: email });
    if (UserData.length === 0) {
      return res.status(200).json({ success: false, message: "no data Found" });
    }
    return res.status(201).json({
      success: true,
      message: "data found successfully",
      data: UserData,
    });
  } catch (error) {
    console.log("Internal server error", error);
  }
});
