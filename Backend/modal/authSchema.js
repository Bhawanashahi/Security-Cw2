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
});
