const Joi = require('joi');
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    description: { type: String, required: true },
  }
);
const prodctSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  reviews: [reviewSchema],
});



function validateProduct(product) {
    const schema = {
      name: Joi.string().min(3).max(30).required(),
      brand : Joi.string().required(),
      price : Joi.number().required(),
      category : Joi.string().required(),
      countInStock : Joi.number().required(),
      description : Joi.string().required()
    };

    return Joi.validate(product, schema);
}

const productModel = mongoose.model('Product', prodctSchema);

module.exports.validate = validateProduct;
module.exports.Product = productModel;