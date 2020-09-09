module.exports = app => {
  const orderItem = require('../controllers/order.controller.')

  // Create an new order item
  app.post("/add-new-order", orderItem.create);

  // Retrieve all order items
  app.get("/all-orderItems", orderItem.findAll);

  // Retrieve an order item by ID.
  app.get('/all-orderItems/:order_ID', orderItem.findOne);

  // Update an order item by ID
  app.put('/all-orderItems/:order_ID', orderItem.update);

  // Delete an order item
  app.delete('/all-orderItems/:order_ID', orderItem.delete);
}
