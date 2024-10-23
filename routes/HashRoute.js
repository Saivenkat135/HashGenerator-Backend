const express = require("express");
const asyncMiddleWare = require("../middleware/catchAsyncErrors.js");
const {
  HashcodeConvertor,
  SaveHashCode,
  HashCodeCompare,
} = require("../controllers/hashCodeController.js");

const router = express.Router();

//hashcode Converting Route
router.route("/hash-code-convert").post(asyncMiddleWare(HashcodeConvertor));

//hash code compare route
router.route("/hash-code-compare").post(asyncMiddleWare(HashCodeCompare));

//hashcode Saving Route
router.route("/user-hashcode-save").post(asyncMiddleWare(SaveHashCode));

module.exports = router;
