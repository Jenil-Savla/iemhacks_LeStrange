const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const donations = require("../models/donation.model");
const products = require("../models/product.model");

router.post("/create", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success, errors: errors.array() });
  }
  try {
    const donation = await donations.create({
      name: req.body.name,
    });
    await donation.save();
    res.status(200).json("Success");
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

router.put("/donate/:id", fetchUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success, errors: errors.array() });
  }
  try {
    const donation = await donations.findById(req.params.id);
    const newPrice = donation.price + req.body.price;
    await donation.updateOne({ $set: { price: parseInt(newPrice) } });
    if (!donation.users.includes(req.user.id)) {
      await donation.updateOne({ $push: { users: req.user.id } });
    }
    const newDonation = await donations.findById(req.params.id);
    console.log("newDonation ", newDonation);
    res.status(200).json("Donated successfully");
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

router.get("/:id", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success, errors: errors.array() });
  }
  try {
    let donation = await donations.findById(req.params.id);
    res.status(200).json({ data: donation });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

router.get("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success, errors: errors.array() });
  }
  try {
    let donation = await donations.find({});
    res.status(200).json({ data: donation });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});
module.exports = router;
