const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ratings = mongoose.model("Rating", ratingSchema);

module.exports = ratings;
