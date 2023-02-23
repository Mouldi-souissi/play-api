const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  cost: { type: Array },
});

module.exports = mongoose.model("game", gameSchema);
