const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  expireAt: { type: Date, default: Date.now, index: { expires: "1d" } },
});

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;