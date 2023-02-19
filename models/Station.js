const mongoose = require("mongoose");

const stationShema = mongoose.Schema({
  name: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  games: { type: Array },
  session: {
    start: { type: Date, default: new Date() },
    end: { type: Date, default: new Date() },
  },
});

module.exports = mongoose.model("station", stationShema);
