const OrderItem = require("../model/orderItem.model");
const DB_CONNECTION = require('../config/db.config');

// Create and Save a new order item.
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    } 

    // Create a order item
    const orderItem = new OrderItem({
      order_item_quantity : req.body.order_item_quantity,
      order_item_price : req.body.order_item_price,
      order_item_total_price : req.body.order_item_total_price,
      product_ID : req.body.product_ID
    })

    // Save order item in database.
    OrderItem.create(orderItem, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the order item."
            });
        } else res.send(data);
    })
}

exports.findAll = (req, res) => {
  OrderItem.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving order items."
            });
        } else {
          
          res.send(data);
        }
    })
}


// find one order item
exports.findOne = (req, res) => {
  OrderItem.findById(req.params.orderItem_ID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Not found order item with id ${req.params.orderItem_ID}.` })
            } else {
                res.status(500).send({
                    message: "Error retrieving order item with id " + req.params.orderItem_ID
                })
            }
        } else {
            res.send(data);
        }
    })
}

// update a order item
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    OrderItem.updateById(
        req.params.orderItem_ID,
        new OrderItem(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found order item with id ${req.params.orderItem_ID}.`
                    })
                } else {
                    res.status(500).send({
                        message: "Error updating order item with id " + req.params.orderItem_ID
                    })
                }
            } else { res.send(data) }
        }
    )
}
exports.delete = (req, res) => {
    console.log(req.params)
    OrderItem.remove(req.params.order_ID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found order item with id ${req.params.order_ID}`
                })
            } else {
                res.status(500).send({
                    message: "could not delete order item with ID " + req.params.order_ID
                })
            }
        } else {
            res.send({
                message: "order item was deleted successfully!"
            })
        }
    })
}