const express = require("express");
const mongoose = require("mongoose");
var multer = require("multer");
const { Cart, Order } = require("../models/cart");
const { Product } = require("../models/product");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const app = express();
const router = express.Router();

router.post("/create", [auth], async (req, res) => {
  console.log(req.body);
  if (!req.body.cartItems || req.body.cartItems.length == 0)
    res.status(400).send({ Error: "cart items are missing" });
  let cartItems = req.body.cartItems;
  let cartItemsdata = [];
  for (let i = 0; i < cartItems.length; i++) {
    let cartProduct = await Product.findById(cartItems[i].productId);
    cartItemsdata.push({
      name: cartProduct.name,
      qty: cartItems[i].qty,
      price: cartProduct.price * cartItems[i].qty,
      productId: cartProduct._id,
    });
  }
  let cart = new Cart({
    userId: req.user._id,
    cartItems: cartItemsdata,
  });
  await cart.save();
  res.send(cart);
});

router.put("/update/:id", [auth], async (req, res) => {
  if (!req.params.id) return res.send({ message: "cart id is mandatory" });
  const cart = await Cart.findOne({ _id: req.params.id });
  if (cart) {
    //if the requested user is not the owner of the cart
    if (req.user._id != cart.userId)
      return res.send({ Error: "U cannot update cart of other users" });
    cart.cartItems = req.body.cartItems;
    res.send(cart);
  } else {
    res.status(404).send({ message: "Cart  Not Found." });
  }
});

router.get("/:id", [auth], async (req, res) => {
  if (!req.params.id) return res.send({ message: "cart id is mandatory" });
  const cart = await Cart.findOne({ _id: req.params.id });
  if (cart) {
    //if the requested user is not the owner of the cart
    if (req.user._id != cart.userId)
      return res.send({ Error: "U cannot acess cart of other users" });
    res.send(cart);
  } else {
    res.status(404).send({ message: "Cart  Not Found." });
  }
});

router.delete("/:id", [auth], async (req, res) => {
  if (!req.params.id) return res.send({ message: "cart id is mandatory" });
  const cart = await Cart.findOne({ _id: req.params.id });
  if (cart) {
    //if the requested user is not the owner of the cart
    if (req.user._id != cart.userId)
      return res.send({ Error: "U cannot delete cart of other users" });
    await cart.remove();
    res.send({ message: "Cart Deleted" });
  } else {
    res.status(404).send({ message: "Cart  Not Found." });
  }
});

router.get("/get/userCart", [auth], async (req, res) => {
  let userId = req.user._id;
  let userCart = await Cart.findOne({ userId: userId }).catch((err) =>
    res.send({ Error: err })
  );
  if (!userCart)
    return res.status(400).send({ Message: "user does not have any cart" });
  res.send(userCart);
});

module.exports = router;
