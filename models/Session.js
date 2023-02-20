const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  start: { type: Date, default: new Date() },
  end: { type: Date, default: new Date() },
  station: { name: { type: String }, id: { type: String } },
  games: { type: Array },
  total: { type: String, required: true },
  user: { type: String, required: true },
});

module.exports = mongoose.model("session", sessionSchema);
