const mongoose = require("mongoose");
const dotenv = require('dotenv');

mongoose.set("strictQuery", true);

dotenv.config();

mongoose
  .connect(
      process.env.MONGODB_URL  
    )
  .then(() => {
    console.log("Connected to Mongo!");
  });
