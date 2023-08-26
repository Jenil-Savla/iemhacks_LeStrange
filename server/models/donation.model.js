const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const donations = mongoose.model("Donation", donationSchema);

module.exports = donations;
