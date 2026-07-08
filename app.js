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

//DB-Connection
const dbConnection = require("./db_connection/db");
dbConnection();

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

//Routes
const loginRoute = require("./routes/Login");
const signupRoute = require("./routes/Signup");

//Middleware to Check User is in session or not
const isUserLoggedIn = require("./middlewares/checkUserSession");

app.get("/", (req, res) => {
  res.redirect("/signup");
});
app.get("/dashboard", isUserLoggedIn, (req, res) => {
  res.render("dashboard");
  console.log("User id From the Session ----------->", req.session.user);
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({ message: "problem while logout" });
    } else {
      res.clearCookie("connect.sid");
      res.redirect("/login");
    }
  });
});

//Middleware to redirect to the route
app.use(loginRoute);
app.use(signupRoute);

//Server
app.listen(3000, () => {
  console.log("Server started successfully");
});
