const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const products = require("../models/product.model");
const ratings = require("../models/rating.model");

router.post("/create/:id", fetchUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    let product = await products.findById(req.params.id);
    let rating = await ratings.find({
      $and: [{ productId: product._id }, { userId: req.user.id }],
    });
    console.log("rating ", rating.length);
    if (rating.length !== 0) {
      return res.status(401).json("Rating already given");
    }
    const Rating = await ratings.create({
      price: 0,
      productId: product._id,
      userId: req.user.id,
      text: req.body.text,
      stars: req.body.stars,
    });
    await Rating.save();
    await product.updateOne({ $push: { userRatings: Rating._id } });
    return res.status(200).json(Rating);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "error", error: err });
  }
});

router.put("/update/:id", fetchUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let rating = await ratings.findById(req.params.id);
    let newRating = await ratings.findByIdAndUpdate(
      rating._id,
      {
        text: req.body.text ? req.body.text : rating.text,
        stars: req.body.stars ? req.body.stars : rating.stars,
      },
      {
        new: true,
      }
    );
    console.log(newRating);
    return res.status(200).json(newRating);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.get("/get/:id", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    let Rating = await ratings.find({ productId: req.params.id });
    return res.status(200).json({ data: Rating });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: err });
  }
});

module.exports = router;
