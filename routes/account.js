const router = require("express").Router();
const Account = require("../models/Account");
const isAuth = require("../permissions/isAuth");
const isAdmin = require("../permissions/isAdmin");

router.post("/", isAuth, isAdmin, async (req, res) => {
  if (!req.body) {
    res.status(400).send("missing data");
  }

  const account = new Account({
    name: req.body.name,
    deposit: req.body.deposit,
  });

  try {
    const doc = await account.save();
    res.status(200).send(doc);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:name", isAuth, (req, res) => {
  Account.find({ name: req.params.name })
    .then((docs) => {
      if (docs.length) {
        res.status(200).send(docs[0]);
      } else {
        res.status(400).send("no account found");
      }
    })
    .catch((err) => res.status(400).send(err));
});

router.put("/:id", isAuth, (req, res) => {
  Account.findByIdAndUpdate(
    req.params.id,
    { ...req.body, lastUpdated: new Date() },
    { new: true }
  )
    .then((doc) => res.json(doc))
    .catch((err) => res.send(err));
});

router.delete("/:id", isAuth, isAdmin, (req, res) => {
  Account.findByIdAndDelete(req.params.id)
    .then((doc) => res.send(doc))
    .catch((err) => res.send(err));
});

module.exports = router;
