const Joi = require('joi');
const mongoose = require("mongoose");


const cartItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: String, required: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
});


const cartSchema = new mongoose.Schema(
    {
      userId : {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
      cartItems : [cartItemSchema]
    }
);

const Cart = mongoose.model('cart', cartSchema);
module.exports.Cart = Cart;

