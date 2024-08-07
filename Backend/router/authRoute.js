const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");

router.get("/", (req, res) => {
  res.send("Hello guys, this is from the router.");
});

router.post("/signin", authController.login);

router.patch("/signout", authController.logout);

router.patch("/get-otp", authController.getOtp);
router.patch("/verify-otp", authController.verifyOtp);

router.patch("/forget-password", authController.forgetPassword); // Corrected method name

module.exports = router;
