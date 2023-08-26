const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  cart: [
    {
      productId: Schema.Types.ObjectId,
      quantity: Number,
    },
  ],
});

const users = mongoose.model("User", userSchema);

module.exports = users;
