const mongoose = require("mongoose");

const HashSchema = mongoose.Schema({
  email: String,
  plaintext: String,
  saltrounds: Number,
  hashcode: String,
});

module.exports = mongoose.model("hashModel", HashSchema);
