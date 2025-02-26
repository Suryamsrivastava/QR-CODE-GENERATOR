const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  serialNo: { type: Number, unique: true },
  shortId: { type: String, required: true, unique: true },
  redirectURL: { type: String, required: true },
  visitHistory: { type: Array, default: [] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("URL", urlSchema);
