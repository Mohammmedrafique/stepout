const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const cors = require("cors");

const Port = 8080 || process.env.Port;

app.get("/", (req, res) => {
  res
    .status(200)
    .send({
      message:
        "Welcome to Backend of IRCTC here you can login and register by route(/register ,/login)",
    });
});
app.use(express.json());
app.use(cors());

app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/admin"));
app.use("/api", require("./routes/trains"));
app.use("/api", require("./routes/bookings"));
app.listen(Port, async () => {
  try {
    await mongoose.connect(process.env.MongoURI);
    console.log(`Server is running at ${Port} and connected to Database`);
  } catch (error) {
    console.error(error);
  }
});
