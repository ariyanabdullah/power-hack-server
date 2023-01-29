const { string } = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const generateAuthToken = (somoy) => {
  const token = jwt.sign({ data: "foo" }, process.env.JWT_KEY, {
    expiresIn: somoy,
  });

  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = joi.object({
    name: joi.string().required().label("Name"),
    phone: joi.string().required().label("Phone"),
    email: joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate, generateAuthToken };
