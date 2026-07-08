const User = require("../models/User");

//Route : /signup
const signupGetController = async function (req, res, next) {
  res.render("signup");
};

const signupPostController = async function (req, res, next) {
  const { name, email, confirmPassword } = req.body;
  try {
    const user = await User.create({
      fullName: name,
      email,
      email,
      password: confirmPassword,
    });

    req.session.user = user._id;
    // console.log(req.body);
    res.redirect("/dashboard");
  } catch (e) {
    res.json({ message: "Somethig wrong has been happend" });
  }
};

module.exports = { signupGetController, signupPostController };
