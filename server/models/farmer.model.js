const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const farmerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  idNumber: {
    type: Number,
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
  otp: {
    type: Number,
  },
});

const farmers = mongoose.model("Farmer", farmerSchema);

module.exports = farmers;
