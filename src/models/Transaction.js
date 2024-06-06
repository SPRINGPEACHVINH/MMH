const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  Date: { type: Date, default: Date.now, required: true },
  amount: { type: Number, required: true },
  From: { type: String, required: true },
  To: { type: String, required: true },
});
const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
