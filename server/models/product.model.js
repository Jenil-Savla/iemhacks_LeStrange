const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    latitude: Number,
    longitude: Number,
  },
  cropType: {
    type: String,
    required: true,
  },
  cropSubType: {
    type: String,
    required: true,
  },
  userRatings: {
    type: [Schema.Types.ObjectId],
    ref: "Rating",
  },
  farmerId: {
    type: Schema.Types.ObjectId,
    ref: "Farmer",
  },
});

const products = mongoose.model("Product", productSchema);

module.exports = products;
