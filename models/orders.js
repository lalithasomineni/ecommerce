const Joi = require('joi');
const mongoose = require("mongoose");



const orderSchema = new mongoose.Schema(
    {
      userId : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      paymentMode: { type: String, default: 'Cash On delivery', required: true },
      itemsPrice: { type: Number },
      taxPrice: { type: Number , default : 0},
      shippingPrice: { type: Number , default : 0},
      totalPrice: { type: Number },
      isPaid: { type: Boolean, default: false },
      paidAt : {type: Date},
      createdAt: { type: Date, default: Date.now()},
      isDelivered: { type: Boolean, default: false },
      isCancelled: { type: Boolean, default: false },
      deliveredAt: { type: Date }     
    }
);

const Order = mongoose.model('order', orderSchema);


module.exports.Order = Order;