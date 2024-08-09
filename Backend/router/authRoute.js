const express = require("express");
const router = express.Router();

const authController = require("../controller/authController"); // Make sure this path is correct

router.get("/", (req, res) => {
  res.send("Hello guys, this is from router");
});

router.post("/signin", authController.login);
router.patch("/signout", authController.logout);
router.patch("/get-otp", authController.getOtp);
router.patch("/verify-otp", authController.verifyOtp);
router.patch("/forget-password", authController.forgetPassword); // Fix typo here: "forgetPasswod" to "forgetPassword"

module.exports = router;
