const DB_CONNECTION = require('../config/db.config')

const Order = function(order) {

    this.user_ID = order.user_ID;
    this.product_ID = order.product_ID;
    this.order_total_price = order.order_total_price;
    this.order_status = order.order_status;
}

// Create an order and save it in database.
Order.create = (newOrder, result) => {
    DB_CONNECTION.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Created order: ", { id: res.insertId, ...newOrder });
        result(null, { id: res.insertId, ...newOrder })
    })
}

// Get all orders from Database 
Order.getAll = result => {
    DB_CONNECTION.query('SELECT * FROM orders', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("orders: ", res);
        result(null, res);
    })
}

// Find order by ID.
Order.findById = (orderID, result) => {
    DB_CONNECTION.query(`SELECT * FROM orders WHERE order_ID = ${orderID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found order: ", res[0]);
            result(null, res[0]);
            return;
        }
        // if order not found with ID.
        result({ kind: "not_found" }, null);
    })
}

Order.updateById = (id, order, result) => {
    let arrayOfData = []
    let arrayOfKeys = []
    for ( key in order ) {
        // console.log(order[key] )
        if (order[key] !== undefined) {
            // console.log(order.key)
            arrayOfKeys.push(key)
            arrayOfData.push(order[key])
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
    DB_CONNECTION.query(`UPDATE orders SET ${arrayOfKeys} WHERE order_ID = ${id}`, arrayOfData, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (!res.affectedRows) {
            // order not found by ID.
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("updated order: ", { id: id, ...order });
        result(null, { id: id, ...order });
    })
}

// Delete a order.
Order.remove = (id, result) => {
    DB_CONNECTION.query("DELETE FROM orders WHERE order_ID = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // order with ID not found
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted one order with ID", id);
        result(null, res)
    })
}

module.exports = Order;