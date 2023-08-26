const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Placed;
// Shipped;
//
// Delivered;

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  //   deliveryId: {
  //     type: String,
  //     required: true,
  //   },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["Placed", "Shipped", "Delivered"],
    default: "Placed",
  },
  Placed: {
    type: Date,
    required: true,
  },
  Shipped: {
    type: Date,
  },
  Delivered: {
    type: Date,
  },
  location: {
    latitude: Number,
    longitude: Number,
  },
});

const orders = mongoose.model("Order", orderSchema);

module.exports = orders;
