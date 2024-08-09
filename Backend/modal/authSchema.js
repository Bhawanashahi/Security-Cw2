const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  otp: {
    type: Number,
  },
  expireOtp: {
    type: Number,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ADMIN",
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
  passwordChangedAt: {
    type: Date,
    default: Date.now,
  },
  loginAttempts: {
    type: Number,
    default: 0,
  },
  lockUntil: {
    type: Date,
  },
});

// Generate authentication token
authSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Adjust token expiration as needed
  });
  return token;
};

// Increment login attempts method
authSchema.methods.incrementLoginAttempts = async function () {
  // Logic for incrementing login attempts...
  if (this.lockUntil && this.lockUntil > Date.now()) {
    this.loginAttempts += 1;
    await this.save();
    return;
  }

  // Reset count if lock period is over or if it's a fresh attempt
  const updates = {
    $inc: { loginAttempts: 1 },
  };

  if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
    // Lock the account if maximum attempts are reached
    updates.$set = {
      lockUntil: Date.now() + LOCK_TIME,
    };
  }

  await this.updateOne(updates);
};

// Virtual property to check if account is locked
authSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

const Auths = mongoose.model("Auths", authSchema);

module.exports = Auths;
