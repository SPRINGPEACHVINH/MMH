const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  Date: { type: Date, default: Date.now, required: true },
  amount: { type: Number, required: true },
  From: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  To: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
