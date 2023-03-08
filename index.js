const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const connect = require("./db/connect");
const user = require("./routes/user");
const station = require("./routes/station");
const session = require("./routes/session");
const game = require("./routes/game");
const account = require("./routes/account");

app.use(cors());
app.use(express.json());

app.use("/api/user", user);
app.use("/api/station", station);
app.use("/api/session", session);
app.use("/api/game", game);
app.use("/api/account", account);

app.listen(PORT, (err) => {
  if (err) console.log("err", err);
  console.log(`app is running on port ${PORT}`);
  connect();
});
