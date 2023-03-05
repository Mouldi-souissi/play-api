const router = require("express").Router();
const Game = require("../models/Game");
const isAdmin = require("../permissions/isAdmin");
const isAuth = require("../permissions/isAuth");

router.get("/", isAuth, (req, res) => {
  Game.find()
    .then((docs) => res.status(200).send(docs))
    .catch((err) => res.status(400).send(err));
});

router.post("/", isAuth, isAdmin, async (req, res) => {
  if (!req.body) {
    res.status(400).send("missing data");
  }

  const game = new Game({
    name: req.body.name,
    prices: req.body.prices,
  });

  try {
    const doc = await game.save();
    res.status(200).send(doc);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", (req, res) => {
  Game.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((docs) => res.status(200).send(docs))
    .catch((err) => res.status(400).send(err));
});

router.delete("/:id", (req, res) => {
  Game.findByIdAndDelete(req.params.id)
    .then((doc) => res.status(200).send(doc))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
