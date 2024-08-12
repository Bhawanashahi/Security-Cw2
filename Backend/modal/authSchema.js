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
  passwordLastChanged: {
    type: Date,
    default: Date.now, // Set the default to the current date
  },
});

// Hashing password
authSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordLastChanged = Date.now(); // Update the password last changed date
  }
  next();
});
