const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  name: { type: String, required: true },
  deposit: { type: String, default: "0" },
  lastUpdated: { type: Date },
  totalGames: { type: String, default: "0" },
  gain: { type: String, default: "0" },
});

module.exports = mongoose.model("account", accountSchema);
