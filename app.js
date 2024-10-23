const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 3000;
app.use(express.json()); // To handle JSON requests
// Use middleware
app.use(bodyParser.json()); // Correct usage
app.use(cors()); // Correct usage

// mongoose.connect("mongodb://localhost:27017/hashdb");
//   // MongoDB Atlas Connection
//   const mongoUri =
//     "mongodb+srv://Meditrance_API:Meditrance%40123@cluster0.oetsi.mongodb.net/hashcodedb?retryWrites=true&w=majority&appName=Cluster0;";

//   if (!mongoUri) {
//     console.error("MongoDB URI not defined in .env file.");
//     process.exit(1);
//   }

//   mongoose
//     .connect(mongoUri)
//     .then(() => {
//       console.log("Connected to MongoDB Atlas CLOUD !!");
//     })
//     .catch((error) => {
//       console.error("Error connecting to MongoDB Atlas:", error);
//     });

mongoose.connect("mongodb://localhost:27017/hashdb");

const user = require("./routes/UserRoute.js");
const hashcode = require("./routes/HashRoute.js");

app.use("/api", user);
app.use("/api", hashcode);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
