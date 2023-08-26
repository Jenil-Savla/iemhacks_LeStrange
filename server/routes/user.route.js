const express = require("express");
const users = require("../models/user.model");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

router.post(
  "/register",
  [body("email").isEmail(), body("password")],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await users.findOne({ email: req.body.email });

      if (user) {
        res.status(400).json({ success, error: "Email ID already used" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await users.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        address: req.body.address,
        number: req.body.number,
        cart: [],
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, "TIAA-TEAM-01");

      success = true;
      res.json({ success, user, authToken });
    } catch (err) {
      console.log(err);
      res.json({ status: "error", error: err });
    }
  }
);

router.post(
  "/login",
  [body("email").isEmail(), body("password")],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await users.findOne({ email: req.body.email });

      if (!user) {
        res.status(400).json({ success, error: "Email ID does not exist" });
      } else {
        const checkPass = bcrypt.compareSync(req.body.password, user.password);
        if (checkPass) {
          const data = {
            user: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(data, "TIAA-TEAM-01");
          success = true;
          res.json({ success, user, authToken });
        }
      }
    } catch (err) {
      console.log(err);
      res.json({ status: "error", error: err });
    }
  }
);

router.post("/addtocart", fetchUser, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await users.findById(req.user.id);
    let cart = user.cart;
    let index = -1;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productId == productId) {
        index = i;
        break;
      }
    }
    if (index == -1) {
      cart.push({ productId, quantity: parseInt(quantity) });
    } else {
      cart[index].quantity += parseInt(quantity);
    }
    user.cart = cart;
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

router.get("/cart", fetchUser, async (req, res) => {
  try {
    const user = await users.findById(req.user.id);
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

router.post("/removefromcart", fetchUser, async (req, res) => {
  try {
    const { productId } = req.body;
    console.log(productId);
    const user = await users.findById(req.user.id);
    console.log(user);
    let cart = user.cart;
    let index = -1;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productId == productId) {
        index = i;
        break;
      }
    }
    if (index == -1) {
      res.json({ success: false, error: "Product not found in cart" });
    } else {
      cart.splice(index, 1);
    }
    user.cart = cart;
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

router.post("/clearcart", fetchUser, async (req, res) => {
  try {
    const user = await users.findById(req.user.id);
    user.cart = [];
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await users.findOne({
      _id: req.params.id,
    });
    res.json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

module.exports = router;
