require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const users = require("./routes/users");
const authRoutes = require("./routes/auth");
const billingRoute = require("./routes/billingRoute");
require("dotenv").config();
const connection = require("./db");

// database Connect
connection();
// middleware

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/", users);
app.use("/api/", authRoutes);

// post

app.use("/api/", billingRoute);

// listen
app.listen(port, () => {
  console.log(`server is running on ${port} `);
});
