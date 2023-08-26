const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const orders = require("../models/order.model");
const products = require("../models/product.model");

router.post("/create", fetchUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success, errors: errors.array() });
  }
  try {
    const Order = await orders.create({
      userId: req.user.id,
      products: req.body.products,
      price: req.body.price,
      address: req.body.address,
      otp: Math.floor(1000 + Math.random() * 9000),
      Placed: Date.now(),
      date: Date.now(),
      location: req.body.location,
    });
    await Order.save();
    res.status(200).json("Order added successfully");
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

router.get("/user", fetchUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success, errors: errors.array() });
  }
  try {
    let order = await orders.find({
      userId: req.user.id,
    });
    res.status(200).json({ orders: order });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

router.get("/farmer", fetchUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    let product = await products.find({
      farmerId: req.user.id,
    });

    let order = await orders.find({
      productId: {
        $in: product.map((product) => product._id),
      },
    });
    res.status(200).json({ orders: order });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

router.get("/today", fetchUser, async (req, res) => {
  try {
    let product = await products.find({
      farmerId: req.user.id,
    });
    if (product.length === 0) return res.status(200).json({ orders: [] });
    let order = await orders.find({
      Placed: {
        $gte: new Date(new Date().setHours(00, 00, 00)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      },
      products: {
        $elemMatch: {
          productId: {
            $in: product.map((product) => product._id),
          },
        },
      },
    });
    res.status(200).json({ orders: order });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

router.get("/week", fetchUser, async (req, res) => {
  try {
    let product = await products.find({
      farmerId: req.user.id,
    });
    if (product.length === 0) return res.status(200).json({ orders: [] });
    let order = await orders.find({
      Placed: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        $lt: new Date(new Date().setDate(new Date().getDate() + 1)),
      },
      products: {
        $elemMatch: {
          productId: {
            $in: product.map((product) => product._id),
          },
        },
      },
    });
    res.status(200).json({ orders: order });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

router.get("/overall", fetchUser, async (req, res) => {
  try {
    let product = await products.find({
      farmerId: req.user.id,
    });
    if (product.length === 0) return res.status(200).json({ orders: [] });
    let order = await orders.find({
      products: {
        $elemMatch: {
          productId: {
            $in: product.map((product) => product._id),
          },
        },
      },
    });
    res.status(200).json({ orders: order });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

router.get("/product/:id", fetchUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    let order = await orders.find({
      productId: req.params.id,
    });
    res.status(200).json({ orders: order });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

router.get("/:id", fetchUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    let order = await orders.findOne({
      _id: req.params.id,
    });
    res.status(200).json({ order });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

router.patch("/update/:id", fetchUser, async (req, res) => {
  const errors = validationResult(req);
  const { status } = req.body;
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    let order = await orders.findOne({
      _id: req.params.id,
    });
    if (order) {
      order.status = status;
      order[status] = Date.now();
      await order.save();
      res.status(200).json({ order });
    } else {
      res.status(400).json({ error: "Order not found" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
});

// Ye reference ke liye hai

// router.post("/checkout", checkout);
// router.post("/verification/:amt/:id/:userId", paymentVerification);
// const checkout = expressAsyncHandler(async (req, res) => {
//   try {
//     var options = {
//       amount: req.body.amount * 100, // amount in the smallest currency unit
//       currency: "INR",
//     };
//     const order = await instance.orders.create(options);
//     res.status(200).json(order);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: error });
//   }
// });

// const paymentVerification = async (req, res) => {
//   console.log("-----  paymentVerification  -----");
//   const amt = req.params.amt / 100;
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;

//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
//     .update(body.toString())
//     .digest("hex");

//   const isAuthentic = expectedSignature === razorpay_signature;
//   const wallet = await Wallet.findById(req.params.id);
//   const oldAmt = wallet.money;
//   const transac = wallet.transactions;
//   const amount = {
//     money: amt + oldAmt,
//   };

//   const transaction = new Transaction({
//     sender: req.params.userId,
//     receiver: process.env.USER_ID,
//     money: req.params.amt / 100,
//     walletId: req.params.id,
//   });

//   const newTransaction = await transaction.save();
//   const newTransactions = [...transac, newTransaction];
//   const newWallet = wallet.updateOne({
//     $push: { transactions: newTransaction },
//   });

//   if (isAuthentic) {
//     const wallet = await Wallet.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: { transactions: newTransactions, money: amount.money },
//       },
//       { new: true }
//     );

//     res.redirect(`http://localhost:3000?reference=${razorpay_payment_id}`);
//   } else {
//     res.status(400).json({
//       success: false,
//     });
//   }
// };

// router.get("/filter", async (req, res) => {
//   const errors = validationResult(req);
//   const cropType = req.query.cropType;
//   const cropSubType = req.query.cropSubType;
//   const price = req.query.price;
//   const origin = req.query.origin;
//   if (!errors.isEmpty()) {
//     res.status(400).json({ success, errors: errors.array() });
//   }
//   try {
//     let productName = cropType
//       ? await products.find({ cropType: cropType })
//       : cropSubType
//       ? products.find({ cropSubType: cropSubType })
//       : price
//       ? products.find({ price: price })
//       : origin
//       ? products.find({ location: localStorage })
//       : products.find({});

//     res.status(200).json({ data: productName });
//   } catch (err) {
//     console.log(err);
//     res.json({ status: "error", error: err });
//   }
// });

module.exports = router;
