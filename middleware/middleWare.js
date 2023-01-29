const express = require("express");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("unauthorize access");
  }
  if (token) {
    const decodedData = jwt.verify(token, process.env.JWT_KEY);
    const email = decodedData.email;
    req.user = await User.findOne({ email });
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "Please Login to access this resource",
    });
  }
};

//veryfy user
// const verifyUser = async (req, res, next) => {
//   const decodeEmail = req.decoded.email;
//   const filter = { email: decodeEmail };
//   const user = await User.findOne(filter);

//   if (!user) {
//     return res.status(403).send({ message: "Forbidden Access" });
//   }
//   next();
// };

module.exports = { checkUser };
