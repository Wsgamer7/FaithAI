const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender_id: String,
  recipient_id: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model("message", MessageSchema);
