const mongoose = require("mongoose");
const dotenv = require('dotenv');

mongoose.set("strictQuery", true);

dotenv.config();

mongoose
  .connect(
      //process.env.MONGODB_URL
      "mongodb+srv://khushidjobanputra77:Khushi77@cluster0.jgmn7d4.mongodb.net/?retryWrites=true&w=majority"
    )
  .then(() => {
    console.log("Connected to Mongo!");
  });
