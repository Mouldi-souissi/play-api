const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  prices: { type: Array },
});

module.exports = mongoose.model("game", gameSchema);
