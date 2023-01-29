const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
const url = process.env.DB_URL;

// console.log(url);
module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(url, connectionParams);
    console.log("connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("not connect to database");
  }
};
