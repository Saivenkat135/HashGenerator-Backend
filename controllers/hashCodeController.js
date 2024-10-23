const bcrypt = require("bcrypt");
const asyncMiddleware = require("../middleware/catchAsyncErrors");

const User = require("../models/UserModel.js");
const Hashmodel = require("../models/HashModel.js");

exports.HashcodeConvertor = asyncMiddleware(async (req, res) => {
  const { plaintext, saltrounds } = req.body;
  try {
    if (!plaintext || !saltrounds) {
      return res
        .status(404)
        .json({ success: false, message: "please fill the required fields" });
    }
    // const rounds = parseInt(saltrounds, 10);

    // // Generate salt using the number of rounds
    // const salt = await bcrypt.genSalt(rounds);
    // console.log(salt);

    const HashedPassword = await bcrypt.hash(plaintext, 10);
    return res.status(201).json({
      success: true,
      message: "password converted successfully",
      data: HashedPassword,
    });
  } catch (error) {
    console.log("internal server error", error);
  }
});
exports.HashCodeCompare = asyncMiddleware(async (req, res) => {
  const { plaintext, hashcode } = req.body;
  try {
    const HashCode = await bcrypt.compare(plaintext, hashcode);
    if (!HashCode) {
      return res.status(404).json({
        success: false,
        message: "Hashcode didn't match to plaintext",
      });
    }
    return res.status(201).json({
      success: true,
      message: "plainText match for the Given hash Code",
    });
  } catch (error) {
    console.log("Internal server error", error);
  }
});

exports.SaveHashCode = async (req, res) => {
  const { email, plaintext, saltrounds, hashcode } = req.body;

  try {
    // Check if user exists
    const VerifyEmail = await User.findOne({ email: email });
    if (!VerifyEmail) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Save hash code data
    const newHashModel = new Hashmodel({
      email: email,
      plaintext: plaintext,
      saltrounds: saltrounds,
      hashcode: hashcode,
    });

    await newHashModel.save();

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "Data saved successfully",
      data: newHashModel,
    });
  } catch (error) {
    console.log("Internal server Error", error);
  }
};
