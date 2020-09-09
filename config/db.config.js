const mysql = require('mysql');
require('dotenv').config();

// Creating the credientials to connect to our DB. 
var DB_CONNECTION = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// Connecting to our Db and checking errors.
DB_CONNECTION.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));

});

module.exports = DB_CONNECTION
true