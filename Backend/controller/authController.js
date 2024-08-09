const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Auths = require("../modal/authSchema"); // Ensure this path is correct
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const authController = {};

// Login function
authController.login = async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in all the required fields" });
    }

    const userLogin = await Auths.findOne({ email: email });
    if (!userLogin) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (!isMatch) {
      if (userLogin.loginAttempts >= 3) {
        userLogin.isLocked = true;
        await userLogin.save();
        return res.status(423).json({ error: "Account locked due to multiple failed login attempts" });
      } else {
        userLogin.loginAttempts += 1;
        await userLogin.save();
        return res.status(400).json({ error: "Invalid credentials" });
      }
    }

    userLogin.loginAttempts = 0;
    token = await userLogin.generateAuthToken();
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    if (userLogin.role === "user") {
      const data = await Auths.findOne({ email: email })
        .select("role")
        .populate("userId");
      res.json({ success: true, data, message: "User signed in successfully" });
    } else if (userLogin.role === "admin") {
      const data = await Auths.findOne({ email: email })
        .select("role")
        .populate("adminId");
      res.json({ success: true, data, message: "Admin signed in successfully" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Server error" });
  }
};

// Logout function
authController.logout = async (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send({ success: true, message: "User logged out successfully" });
};

// Get OTP function
authController.getOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const verifyEmail = await Auths.findOne({ email });
    if (verifyEmail) {
      const otpCode = Math.floor(Math.random() * 10000 + 1);
      const setOpt = await Auths.findOneAndUpdate(
        { email },
        {
          $set: {
            otp: otpCode,
            expireOtp: new Date().getTime() + 300 * 1000,
          },
        },
        { new: true, useFindAndModify: false }
      );

      // Send email with OTP
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
      });

      const mailOptions = {
        from: "bidhan.fyp@gmail.com",
        to: `${email}`,
        subject: "Login credentials",
        text: `Your OTP to reset your password is: ${otpCode}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.status(200).send({
        success: true,
        setOpt,
        message: "Please check your email for the OTP",
      });
    } else {
      res.status(422).send({ success: false, message: "Email ID not matched" });
    }
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

// Verify OTP function
authController.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const verifyOTP = await Auths.findOne({ email, otp });

    if (verifyOTP) {
      const currentTime = new Date().getTime();
      const diff = verifyOTP.expireOtp - currentTime;
      if (diff < 0) {
        res.status(422).send({ success: false, message: "OTP expired" });
      } else {
        res.status(200).send({
          success: true,
          message: "OTP matched",
          verify: "verified",
        });
      }
    } else {
      res.status(422).send({ success: false, message: "Invalid OTP" });
    }
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

// Reset password function
authController.forgetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await Auths.findOneAndUpdate(
      { email },
      {
        $set: {
          password: await bcrypt.hash(password, 12),
        },
      },
      { new: true, useFindAndModify: false }
    );

    await data.save();
    res.status(200).send({ success: true, message: "Password updated" });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

module.exports = authController;
