const isUserLoggedIn = function (req, res, next) {
  if (!req.session.user) {
    res.json({ message: "Please Signup or Login First" });
    // res.redirect("/login");
  } else {
    next();
  }
};

module.exports = isUserLoggedIn;
