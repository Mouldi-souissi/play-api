const router = require("express").Router();
const isAuth = require("../permissions/isAuth");
const isAdmin = require("../permissions/isAdmin");
const Session = require("../models/Session");

router.get("/", isAuth, isAdmin, (req, res) => {
  Session.find()
    .sort({ end: -1 })
    .then((docs) => res.status(200).send(docs))
    .catch((err) => res.status(400).send(err));
});

router.post("/", isAuth, isAdmin, async (req, res) => {
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
    const doc = await session.save();
    res.status(200).send(doc);
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
