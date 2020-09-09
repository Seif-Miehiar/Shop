const DB_CONNECTION = require('../config/db.config')

const Product = function(item) {

    this.order_number = item.order_number;
    this.order_user_ID = item.order_user_ID;
    this.order_product_ID = item.order_product_ID;
    this.order_total_price = item.order_total_price;
    this.order_status = item.order_status;
}

// Create a product and save it in database.
Product.create = (newItem, result) => {
    DB_CONNECTION.query("INSERT INTO products SET ?", newItem, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Created product: ", { id: res.insertId, ...newItem });
        result(null, { id: res.insertId, ...newItem })
    })
}

// Get all producs from Database 
Product.getAll = result => {
    DB_CONNECTION.query('SELECT * FROM products', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("products: ", res);
        result(null, res);
    })
}

// Find product by ID.
Product.findById = (productid, result) => {
    DB_CONNECTION.query(`SELECT * FROM products WHERE product_ID = ${productid}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found product: ", res[0]);
            result(null, res[0]);
            return;
        }
        // if product not found with ID.
        result({ kind: "not_found" }, null);
    })
}

Product.updateById = (id, item, result) => {
    let arrayOfData = []
    let arrayOfKeys = []
    for ( key in item ) {
        // console.log(item[key] )
        if (item[key] !== undefined) {
            // console.log(item.key)
            arrayOfKeys.push(key)
            arrayOfData.push(item[key])
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
    DB_CONNECTION.query(`UPDATE products SET ${arrayOfKeys} WHERE product_ID = ${id}`, arrayOfData, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (!res.affectedRows) {
            // product not found by ID.
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("updated product: ", { id: id, ...item });
        result(null, { id: id, ...item });
    })
}

// Delete a product.
Product.remove = (id, result) => {
    DB_CONNECTION.query("DELETE FROM products WHERE product_ID = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // product with ID not found
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted one product with ID", id);
        result(null, res)
    })
}

module.exports = Product;