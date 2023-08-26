const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://khushidjobanputra77:Khushi77@cluster0.jgmn7d4.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to Mongo!");
  });
