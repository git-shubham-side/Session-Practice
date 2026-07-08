const express = require("express");
const app = express();
const session = require("express-session");
const path = require("node:path");
const dotenv = require("dotenv").config();

//Views Setting up
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Public Setup
app.use(express.static(path.join(__dirname, "public")));

//Body parsers - for Form data Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Session Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 din
      httpOnly: true,
      secure: false,
    },
  }),
);

//Server
app.listen(3000, () => {
  console.log("Server started successfully");
});
