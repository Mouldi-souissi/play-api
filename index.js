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
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  next();
});

app.use("/api/user", user);
app.use("/api/station", station);
app.use("/api/session", session);
app.use("/api/game", game);
app.use("/api/account", account);

app.get("/api", (req, res) => {
  res.send("welcome to play api");
});

app.listen(PORT, (err) => {
  if (err) console.log("err", err);
  console.log(`app is running on port ${PORT}`);
  connect();
});
