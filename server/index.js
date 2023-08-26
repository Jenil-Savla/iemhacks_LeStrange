const express = require("express");
require("./db");
require("dotenv").config();
const cors = require("cors");
const app = express();

const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
const ratingRouter = require("./routes/rating.route");
const farmerRouter = require("./routes/farmer.route");
const orderRouter = require("./routes/order.route");
const donationRouter = require("./routes/donation.route");
// const farmerRouter = require("./routes/farmer.route");

app.use(cors());

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/rating", ratingRouter);
app.use("/farmer", farmerRouter);
app.use("/order", orderRouter);
app.use("/donation", donationRouter);
const port = 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
