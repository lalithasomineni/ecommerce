const express = require("express");
const mongoose = require("mongoose");
const {Cart} = require("../models/cart");
const {Order} = require("../models/orders");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const app = express();
const router = express.Router();


router.post('/createOrder/:cartId',[auth], async (req,res) =>{
    if(!req.params.cartId) return res.send({message : "cart id is mandatory"});
    const cart = await Cart.findOne({ _id: req.params.cartId });
    if(!cart) return res.status(404).send({ message: 'Cart  Not Found.' });
    //if the requested user is not the owner of the cart
    if(req.user._id != cart.userId) return res.send({Error : "U cannot create invoice using others cart"})
    let cartFinalPrice = cart.cartItems.reduce((pilot,cartElement) =>{
        return pilot + parseInt(cartElement.price)
    },0)
    let order =  new Order({
        userId : req.user._id,
        cartId : req.params.id,
        address: req.body.address,
        city: req.body.city,
        postalCode: req.body.postalCode,
        country: req.body.country,
        itemsPrice: cartFinalPrice,
        totalPrice: cartFinalPrice   
    })
    await order.save()
    .catch((err) =>{
        return res.status(500).send({error : err})
    });
    res.send(order);
})


router.put('/cancelOrder/:id',[auth], async (req,res) =>{
    if(!req.params.id) return res.send({message : "order id is mandatory"});
    const order = await Order.findOne({ _id: req.params.id });
    if(!order) return res.status(404).send({ message: 'order  Not Found.' });
    order.isCancelled = true;
    await order.save();
    res.send({Message : "Order has been cancelled sucessfully"});
})


router.put('/pay/:id',[auth], async (req,res) =>{
    if(!req.params.id) return res.send({message : "order id is mandatory"});
    const order = await Order.findOne({ _id: req.params.id });
    if(!order) return res.status(404).send({ message: 'order  Not Found.' });
    if(order.isCancelled || order.isPaid) return res.status(404).send({ message: 'cannot add payment as order has been cancelled or already paid' });
    order.isPaid = true;
    order.paidAt = Date.now();
    await order.save()
    .catch((err) =>{
        res.status(500).send({error : err})
    });
    res.send({Message : "Order has been placed sucessfully"});
});


module.exports = router;

