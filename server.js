const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()
const cookieParser = require("cookie-parser")
// const path = require('path');


// middlewares
app.use(cors());
//to parse incoming data to express server
app.use(express.json());
app.use(cookieParser())
//for devlopment use only
// app.use(express.static(path.join(__dirname, 'client/build')));

// port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})