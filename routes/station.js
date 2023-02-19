const router = require("express").Router();
const isAuth = require("../permissions/isAuth");
const isAdmin = require("../permissions/isAdmin");
const Station = require("../models/Station");

router.get("/", isAuth, (req, res) => {
  Station.find()
    .then((docs) => {
      res.status(200).send(docs);
    })
    .catch((err) => res.status(400).send(err));
});

router.get("/:id", isAuth, (req, res) => {
  Station.findById(req.params.id)
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => res.status(400).send(err));
});

router.post("/", async (req, res) => {
  if (!req.body) {
    res.status(400).send("missing data");
  }

  const station = new Station({
    name: req.body.name,
    isActive: false,
    games: [],
    session: { start: new Date(), end: new Date() },
  });

  try {
    const doc = await station.save();
    res.status(200).send(doc);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", isAuth, (req, res) => {
  Station.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((doc) => res.status(200).send(doc))
    .catch((err) => res.status(400).send(err));
});

router.delete("/:id", isAuth, isAdmin, (req, res) => {
  Station.findByIdAndDelete(req.params.id)
    .then((doc) => res.status(200).send(doc))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
