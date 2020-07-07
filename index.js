const mongoose = require("mongoose");
const users = require("./routes/users");
const express = require("express");
const auth = require("./routes/auth");
const product = require("./routes/product");
const cart = require("./routes/cart");
const orders = require("./routes/orders");
const config = require("config");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51Gzyd4Fub5OADW5noNIwHH1qn4ftYgilKHbavOBgKmS9cON0WflfH8TiwLkSEi0kEqLUQxMKfchidvarjrOFDbli00fyZ0uMRS"
);
const app = express();
mongoose
  .connect(config.get("mongodburl"))
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error(err));

if (!config.get("jwtprivatekey")) {
  console.log("jwt private key is not defined or undefined");
  process.exit(1);
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/products", product);
app.use("/api/cart", cart);
app.use("/api/orders", orders);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
