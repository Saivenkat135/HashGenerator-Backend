const express = require("express");
const asyncMiddleware = require("../middleware/catchAsyncErrors");
const {
  UserRegistration,
  userLogin,
  UserDashboard,
} = require("../controllers/UserController.js");

const router = express.Router();

//user registration route
router.route("/user-reg").post(asyncMiddleware(UserRegistration));

//user login route
router.route("/user-login").post(asyncMiddleware(userLogin));

//user Dashboard
router.route("/user-dashboard").post(asyncMiddleware(UserDashboard));

module.exports = router;
