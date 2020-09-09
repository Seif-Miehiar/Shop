const DB_CONNECTION = require('../config/db.config')

const User = function(user) {

    this.user_username = user.user_username;
    this.user_email = user.user_email;
    this.user_phone_number = user.user_phone_number;
    this.user_password = user.user_password;
    this.user_active = user.user_active;
    this.user_verified = user.user_verified;
    this.user_isAdmin = user.user_isAdmin;
}

// Create a user and save it in database.
User.create = (newUser, result) => {
    DB_CONNECTION.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Created User: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser })
    })
}

// Get all users from Database 
User.getAll = result => {
    DB_CONNECTION.query('SELECT * FROM users', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    })
}

// Check user by email
User.findByEmail = (user, result) => {
    DB_CONNECTION.query(`SELECT * FROM users WHERE user_email = ${user}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("Found a user: ", res[0])
            result(null, res[0]);
            return;
        }

        //if user is not found!
        result({ kind: "Not found" }, null);
    })
}

// Find user by ID.
User.findById = (userId, result) => {
    DB_CONNECTION.query(`SELECT * FROM users WHERE user_ID = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }
        // if user not found with ID.
        result({ kind: "not_found" }, null);
    })
}

User.updateById = (id, user, result) => {
    let arrayOfData = []
    let arrayOfKeys = []
    for ( key in user ) {
        // console.log(user[key] )
        if (user[key] !== undefined) {
            // console.log(user.key)
            arrayOfKeys.push(key)
            arrayOfData.push(user[key])
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
    DB_CONNECTION.query(`UPDATE users SET ${arrayOfKeys} WHERE user_id = ${id}`, arrayOfData, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (!res.affectedRows) {
            // user not found by ID.
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
    })
}

// Delete a user.
User.remove = (id, result) => {
    DB_CONNECTION.query("DELETE FROM users WHERE user_ID = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // user with ID not found
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted one user with ID", id);
        result(null, res)
    })
}

module.exports = User;