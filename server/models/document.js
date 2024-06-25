const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  userId: String,
  content: String,
});
module.exports = mongoose.model("document", DocumentSchema);
