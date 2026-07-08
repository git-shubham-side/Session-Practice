const express = require("express");
const router = express.Router();
const {
  signupGetController,
  signupPostController,
} = require("../controllers/signupController");

router.get("/signup", signupGetController);
router.post("/signup", signupPostController);

module.exports = router;
