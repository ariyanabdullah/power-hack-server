const { date, number } = require("joi");
const mongoose = require("mongoose");
const billingSchema = new mongoose.Schema({
  FullName: { type: String, default: "" },
  phone: { type: String, default: "" },
  email: { type: String, default: "" },
  amount: { type: String, default: "" },
  date: { type: Number, default: "" },
});

const Bill = mongoose.model("Bill", billingSchema);

module.exports = Bill;
