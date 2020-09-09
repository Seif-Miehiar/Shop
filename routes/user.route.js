module.exports = app => {
  const users = require('../controllers/user.controller')

  // Create a new user
  app.post("/add-new-user", users.create);

  // Retrieve all user
  app.get("/all-users", users.findAll);

  app.get('/check-user/:user_email', users.check_user);

  // Retrieve a user by ID.
  app.get('/all-users/:user_ID', users.findOne);

  // Update a user by ID
  app.put('/all-users/:user_ID', users.update);

  // Delete a user
  app.delete('/all-users/:user_ID', users.delete);
}
// {
  // "user_username": "Seif Miehiar",
  // "user_email": "Seif@gmail.com",
  // "user_phone_number": "905439626561",
  // "user_password": "testPassword",
  // "user_active": 0,
  // "user_verified": 0,
  // "user_isAdmin": 1
  // }
  // 