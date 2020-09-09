module.exports = app => {
  const products = require('../controllers/product.controller')

  // Create a new product
  app.post("/add-new-product", products.create);

  // Retrieve all product
  app.get("/all-products", products.findAll);

  // Retrieve a product by ID.
  app.get('/all-products/:product_ID', products.findOne);

  // Update a product by ID
  app.put('/all-products/:product_ID', products.update);

  // Delete a product
  app.delete('/all-products/:product_ID', products.delete);
}