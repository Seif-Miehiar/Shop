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

// {
//   "product_name": "product test 1",
//   "product_description": "product test 1 description changing description on update by id",
//   "product_quantity": "20",
//   "product_image": "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-1.2.1&w=1000&q=80",
//   "product_price": 50
//   }
  