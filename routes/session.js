const router = require("express").Router();
const isAuth = require("../permissions/isAuth");
const isAdmin = require("../permissions/isAdmin");
const Session = require("../models/Session");
const {
  startOfDay,
  startOfMonth,
  startOfWeek,
  endOfDay,
  endOfMonth,
  endOfWeek,
} = require("date-fns");
const Account = require("../models/Account");

router.get("/:period", isAuth, isAdmin, (req, res) => {
  const period = req.params.period;
  let query = "";

  if (period === "daily") {
    query = { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) };
  }
  if (period === "weekly") {
    query = {
      $gte: startOfWeek(new Date(), { weekStartsOn: 1 }),
      $lte: endOfWeek(new Date(), { weekStartsOn: 1 }),
    };
  }
  if (period === "monthly") {
    query = { $gte: startOfMonth(new Date()), $lte: endOfMonth(new Date()) };
  }

  if (period === "all") {
    Session.find()
      .sort({ end: -1 })
      .then((docs) => res.status(200).send(docs))
      .catch((err) => res.status(400).send(err));
  } else {
    Session.find({ end: query })
      .sort({ end: -1 })
      .then((docs) => res.status(200).send(docs))
      .catch((err) => res.status(400).send(err));
  }
});

router.post("/", isAuth, async (req, res) => {
  if (!req.body) {
    res.status(400).send("missing data");
  }

  const session = new Session({
    start: new Date(req.body.start),
    end: new Date(),
    station: req.body.station,
    games: req.body.games,
    total: req.body.total,
    user: req.user.name,
  });

  try {
    // update account
    const fond = await Account.find().then((docs) => {
      if (docs.length) {
        return docs[0];
      } else {
        return {};
      }
    });

    if (fond) {
      await Account.findByIdAndUpdate(fond._id, {
        deposit: Number(fond.deposit) + Number(req.body.total),
        lastUpdated: new Date(),
        totalGames:
          Number(fond.totalGames) +
          req.body.games.reduce(
            (sum, game) => (sum += Number(game.totalGames)),
            0
          ),
        gain: Number(fond.gain) + req.body.total,
      });
      const doc = await session.save();
      res.status(200).send(doc);
    } else {
      res.status(400).send("account not found");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", isAuth, isAdmin, (req, res) => {
  Session.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((doc) => res.status(200).send(doc))
    .catch((err) => res.status(400).send(err));
});

router.delete("/:id", isAuth, isAdmin, (req, res) => {
  Session.findByIdAndDelete(req.params.id)
    .then((doc) => res.status(200).send(doc))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
