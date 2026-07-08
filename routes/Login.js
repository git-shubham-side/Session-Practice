const express = require("express");
const router = express.Router();
const {
  loginGetController,
  loginPostController,
} = require("../controllers/loginController");

router.get("/login", loginGetController);
router.post("/login", loginPostController);

module.exports = router;
