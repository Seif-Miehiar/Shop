const Order = require("../model/order.model");
const DB_CONNECTION = require('../config/db.config');

// Create and Save a new order.
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    } 

    // Create a order
    const order = new Order({
      user_ID : req.body.user_ID,
      product_ID : req.body.product_ID,
      order_total_price : req.body.order_total_price,
      order_status : req.body.order_status
    })

    // Save order in database.
    Order.create(order, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the order."
            });
        } else res.send(data);
    })
}

exports.findAll = (req, res) => {
  Order.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        } else {
          
          res.send(data);
        }
    })
}


// find one order
exports.findOne = (req, res) => {
  Order.findById(req.params.order_ID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Not found order with id ${req.params.order_ID}.` })
            } else {
                res.status(500).send({
                    message: "Error retrieving order with id " + req.params.order_ID
                })
            }
        } else {
            res.send(data);
        }
    })
}

// update a order
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    Order.updateById(
        req.params.order_ID,
        new Order(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found order with id ${req.params.order_ID}.`
                    })
                } else {
                    res.status(500).send({
                        message: "Error updating order with id " + req.params.order_ID
                    })
                }
            } else { res.send(data) }
        }
    )
}
exports.delete = (req, res) => {
    console.log(req.params)
    Order.remove(req.params.order_ID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found order with id ${req.params.order_ID}`
                })
            } else {
                res.status(500).send({
                    message: "could not delete order with ID " + req.params.order_ID
                })
            }
        } else {
            res.send({
                message: "order was deleted successfully!"
            })
        }
    })
}