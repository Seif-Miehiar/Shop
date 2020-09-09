module.exports = app => {
  const orders = require('../controllers/order.controller.')

  // Create an new order
  app.post("/add-new-order", orders.create);

  // Retrieve all orders
  app.get("/all-orders", orders.findAll);

  // Retrieve an order by ID.
  app.get('/all-orders/:order_ID', orders.findOne);

  // Update an order by ID
  app.put('/all-orders/:order_ID', orders.update);

  // Delete an order
  app.delete('/all-orders/:order_ID', orders.delete);
}

// {
  // "user_ID": "1",
  // "product_ID": "1",
  // "order_total_price": 200,
  // "order_status": "PENDING"
  // }
  // 