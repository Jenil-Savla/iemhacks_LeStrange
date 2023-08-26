const express = require("express");
const farmers = require("../models/farmer.model");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const axios = require("axios");
const qs = require("qs");

router.post("/register", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await farmers.findOne({ email: req.body.email });

    if (user) {
      res.status(400).json({ error: "Email ID already used" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await farmers.create({
      name: req.body.name,
      idNumber: req.body.id,
      address: req.body.address,
      number: req.body.number,
    });
    const data = {
      user: {
        id: user.id,
      },
    };

    const authToken = jwt.sign(data, "TIAA-TEAM-01");
    res.json({ user, authToken });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

router.post("/sendOtp", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const user = await farmers.findOne({ idNumber: req.body.id });
    if (!user) {
      res.status(400).json({ error: "ID does not exist" });
    }

    let data = qs.stringify({
      To: "+91" + user.number,
      From: "+15855342267",
      Body: "Your FarmEasy verification code is: " + otp,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.twilio.com/2010-04-01/Accounts/ACde68f119ddacfa0dcc4307e4002d40c3/Messages.json",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic QUNkZTY4ZjExOWRkYWNmYTBkY2M0MzA3ZTQwMDJkNDBjMzoxMDAwNjBjM2JlNmVkYTVjM2VmYmE5ZWUzNWY2NTA4MQ==",
      },
      data: data,
    };

    axios
      .request(config)
      .then(async (response) => {
        user.otp = otp;
        await user.save();
        res.json({ success: true, otp });
      })
      .catch((error) => {
        console.log(error);
        res.json({ success: false, error });
      });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

router.post("/login", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await farmers.findOne({ idNumber: req.body.id });
    if (!user) {
      res.status(400).json({ error: "ID does not exist" });
    } else {
      if (user.otp === req.body.otp) {
        const data = {
          user: {
            id: user.id,
          },
        };

        const authToken = jwt.sign(data, "TIAA-TEAM-01");
        res.json({ user, authToken });
      } else {
        res.status(400).json({ error: "OTP is incorrect" });
      }
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

module.exports = router;
