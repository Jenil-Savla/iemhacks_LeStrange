const { response } = require("express");
const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const products = require("../models/product.model");
const { cloudinary } = require("../utils/cloudinary");
const axios = require("axios");

router.post("/create", fetchUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let productName = await products.findOne({ name: req.body.name });
    console.log("adding product");
    if (productName) {
      return res.status(200).json("Product already exists");
    }
    // const {data} = await axios.post("http://127.0.0.1:5000/crop", {"crop_image":req.body.image});
    const Product = await products.create({
      name: req.body.name ? req.body.name : req.body.cropSubType,
      quantity: req.body.quantity,
      // image: req.body.image,
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Honeycrisp-Apple.jpg',
      price: req.body.price,
      cropType: "Grains",
      cropSubType: req.body.name,
      famerId: req.user.id,
      location: req.body.location,
    });
    Product.farmerId = req.user.id;
    await Product.save();
    return res.status(200).json("Product added successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put("/update/:id", fetchUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let product = await products.findById(req.params.id);
    let newProduct = await products.findByIdAndUpdate(
      product._id,
      {
        price: req.body.price ? req.body.price : product.price,
        quantity: req.body.quantity ? req.body.quantity : product.quantity,
      },
      {
        new: true,
      }
    );
    console.log(newProduct);
    return res
      .status(200)
      .json("Product quantity and price updated successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get("/getOne", fetchUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    console.log(req.user.id);
    let productName = await products.find({ farmerId: req.user.id });
    res.status(200).json({ data: productName });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ status: "error", error: err });
  }
});

router.post("/upload", fetchUser, async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "TIAA-TEAM-01",
      transformation: [{ width: 1000, height: 1000, crop: "limit" }],
    });

    res.status(200).json(uploadResponse);
  } catch (err) {
    console.error("err.message ", err.message);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.get("/get/:id", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    let productName = await products.findById(req.params.id);
    res.status(200).json({ data: productName });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: err });
  }
});

router.get("/getAll", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    let productName = await products.find({});
    res.status(200).json({ data: productName });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: err });
  }
});

router.get("/get/cropType/name", async (req, res) => {
  const errors = validationResult(req);
  const cropType = req.query.cropType;
  console.log("cropType ", cropType);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    let productName = await products.find({ cropType: cropType });
    res.status(200).json({ data: productName });
  } catch (err) {
    console.log(err);
    return res.json({ status: "error", error: err });
  }
});

router.get("/filter", async (req, res) => {
  const errors = validationResult(req);
  const cropType = req.query.cropType;
  const cropSubType = req.query.cropSubType;
  const price = req.query.price;
  const quantity = req.query.quantity;
  if (!errors.isEmpty()) {
    res.status(400).json({ success, errors: errors.array() });
  }
  try {
    let productName = await products.find({
      $and: [
        {
          $or: [
            { cropSubType: cropSubType },
            { price: price },
            { quantity: quantity },
          ],
        },
        { cropType: cropType },
      ],
    });

    return res.status(200).json({ data: productName });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ status: "error", error: err });
  }
});

module.exports = router;
