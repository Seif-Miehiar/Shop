const Product = require("../model/product.model");
const DB_CONNECTION = require('../config/db.config');

// Create and Save a new product.
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    } 

    // Create a product
    const product = new Product({
      product_name : req.body.product_name,
      product_description : req.body.product_description,
      product_quantity : req.body.product_quantity,
      product_image : req.body.product_image,
      product_price : req.body.product_price
    })

    // Save product in database.
    Product.create(product, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the product."
            });
        } else res.send(data);
    })
}

exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products."
            });
        } else {
          if ( data[0]) {
            const buf = new Buffer(data[0].product_image);
            // console.log("meeeeeeeee ",buf)
          }
          res.send(data);
        }
    })
}


// find one product
exports.findOne = (req, res) => {
  Product.findById(req.params.product_ID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Not found Product with id ${req.params.product_ID}.` })
            } else {
                res.status(500).send({
                    message: "Error retrieving Product with id " + req.params.product_ID
                })
            }
        } else {
            res.send(data);
        }
    })
}

// update a product
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    Product.updateById(
        req.params.product_ID,
        new Product(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found product with id ${req.params.product_ID}.`
                    })
                } else {
                    res.status(500).send({
                        message: "Error updating product with id " + req.params.product_ID
                    })
                }
            } else { res.send(data) }
        }
    )
}
exports.delete = (req, res) => {
    console.log(req.params)
    Product.remove(req.params.product_ID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found product with id ${req.params.product_ID}`
                })
            } else {
                res.status(500).send({
                    message: "could not delete product with ID " + req.params.product_ID
                })
            }
        } else {
            res.send({
                message: "product was deleted successfully!"
            })
        }
    })
}