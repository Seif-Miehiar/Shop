const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const helmet = require('helmet');
const cors = require("cors");
const path = require('path');
var session = require('express-session');
require('dotenv').config()

const app = express();

// Setup server port
const PORT = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(helmet())
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//to parse incoming data to express server
app.use(express.json());
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html")) || res.json({ message: "Welcome to Fixi application." }); ;
  // res.json({ message: "Welcome to Fixi application." });
});

require('./routes/user.route')(app);
require('./routes/product.route')(app);
require('./routes/order.route')(app);



app.listen(PORT, () => {
  console.log(`App listening on ${PORT} number!\nOn this link http://localhost:${PORT}`)
})