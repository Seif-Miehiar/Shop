const DB_CONNECTION = require('../config/db.config')

const OrderItem = function(order) {

    this.order_item_quantity = order.order_item_quantity;
    this.order_item_price = order.order_item_price;
    this.order_item_total_price = order.order_item_total_price;
    this.product_ID = order.product_ID;
}

// Create an order item and save it in database.
OrderItem.create = (newOrderItem, result) => {
    DB_CONNECTION.query("INSERT INTO orderItems SET ?", newOrderItem, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Created order item: ", { id: res.insertId, ...newOrderItem });
        result(null, { id: res.insertId, ...newOrderItem })
    })
}

// Get all order items from Database 
OrderItem.getAll = result => {
    DB_CONNECTION.query('SELECT * FROM orderItems', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("order items: ", res);
        result(null, res);
    })
}

// Find order item by ID.
OrderItem.findById = (orderID, result) => {
    DB_CONNECTION.query(`SELECT * FROM orderItems WHERE orderItem_ID = ${orderID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found order item: ", res[0]);
            result(null, res[0]);
            return;
        }
        // if order item not found with ID.
        result({ kind: "not_found" }, null);
    })
}

OrderItem.updateById = (id, orderItem, result) => {
    let arrayOfData = []
    let arrayOfKeys = []
    for ( key in orderItem ) {
        // console.log(orderItem[key] )
        if (orderItem[key] !== undefined) {
            // console.log(orderItem.key)
            arrayOfKeys.push(key)
            arrayOfData.push(orderItem[key])
            // console.log(arrayOfData)
        }
    }
    for (let i = 0; i < arrayOfKeys.length; i++) {
        if(i === arrayOfKeys.length  ){
            arrayOfKeys[i] = arrayOfKeys[i] + " = ?";
        }
        arrayOfKeys[i] = arrayOfKeys[i] + " = ? ";
    }
    arrayOfData.push(id)
    DB_CONNECTION.query(`UPDATE orderItems SET ${arrayOfKeys} WHERE order_ID = ${id}`, arrayOfData, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (!res.affectedRows) {
            // order item not found by ID.
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("updated order item: ", { id: id, ...orderItem });
        result(null, { id: id, ...orderItem });
    })
}

// Delete a order item.
OrderItem.remove = (id, result) => {
    DB_CONNECTION.query("DELETE FROM orderItems WHERE order_ID = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // order item with ID not found
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted one order item with ID", id);
        result(null, res)
    })
}

module.exports = OrderItem;