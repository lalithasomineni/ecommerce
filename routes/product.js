const express = require("express");
const mongoose = require("mongoose");
var multer  = require('multer');
const {Product, validate} = require("../models/product");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const app = express();
const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})
   
var upload = multer({ storage: storage })

router.post("/uploadProduct",[auth,admin],upload.single('product'),async  (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    let product =  new Product({
        name : req.body.name,
        brand : req.body.brand,
        price : parseInt(req.body.price),
        category : req.body.category,
        countInStock : parseInt(req.body.countInStock),
        description : req.body.description,
        image : './'+ req.file.path
    }) 
    await product.save().then( (uploadedProduct) =>{
            res.send(uploadedProduct);
        }
    ).catch( (err) =>{
            res.status(500).send(uploadedProduct);
        }
    )  
});

router.put('/updateProduct/:id',[auth,admin],async (req, res) => {
    if(!req.params.id)  res.send({message : "id is mandatory"});
    console.log(req.body);
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(!product) return res.status(400).send({ message: 'product id is invalid' });
    product.name = req.body.name,
    product.brand = req.body.brand,
    product.price = parseInt(req.body.price),
    product.category = req.body.category,
    product.countInStock = parseInt(req.body.countInStock),
    product.description = req.body.description
    await product.save()
    .then((data) =>{
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send(err);
    })
});



router.get('/', async (req, res) => {
    const category = req.query.category ? { category: req.query.category } : {};
    const pageNumber = req.query.page ? req.query.page  : 1;
    const size = req.query.size ? req.query.size  : 10;
    const searchString = req.query.searchString
    ? {
        name: {
          $regex: req.query.searchString,
          $options: 'i',
        },
      }
    : {};
    const products = await Product
    .find({...category,...searchString})
    .limit(parseInt(size))
    .skip(parseInt(pageNumber))
    .catch((err)=>{
        res.status(500).send({Error : err});
    });
    res.send(products);
});



router.get('/:id', async (req, res) => {
    console.log(req.query)
    if(!req.params.id) return res.send({message : "id is mandatory"})
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found.' });
    }
});

router.delete('/:id',[auth,admin], async (req, res) => {
    if(!req.params.id) return res.send({message : "id is mandatory"})
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
      await deletedProduct.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.send('Error in Deletion.');
    }
});


module.exports = router;