const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otp: { type: String, required: true },
    isUsed: { type: Boolean, default: false },
    expireAt: { type: Date, default: Date.now, index: { expires: "1m" } },
  },
  {
    timestamps: true,
  }
);

const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;
