const User = require("../models/User");
//Route : /login
const loginGetController = async function (req, res, next) {
  res.render("login");
};

const loginPostController = async function (req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  req.session.user = user._id;
  res.redirect("/dashboard");
};

module.exports = { loginGetController, loginPostController };
