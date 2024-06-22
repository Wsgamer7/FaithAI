const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: {
    _id: String,
    name: String,
  },
  recipient: {
    _id: String,
    name: String,
  },
  content: String,
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model("message", MessageSchema);
