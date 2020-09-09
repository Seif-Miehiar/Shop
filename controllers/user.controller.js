const User = require("../model/user.model");
const DB_CONNECTION = require('../config/db.config');

// Create and Save a new User.
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    } 

    // Create a User
    const user = new User({
        user_username: req.body.user_username,
        user_email: req.body.user_email,
        user_phone_number: req.body.user_phone_number,
        user_password: req.body.user_password,
        user_active: req.body.user_active,
        user_verified: req.body.user_verified,
        user_isAdmin: req.body.user_isAdmin
    })

    // Save User in database.
    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        } else res.send(data);
    })
}

exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        } else res.send(data);
    })
}

exports.check_user = (req, res) => {
    User.findByEmail(req.params.user_email, (err, data) => {
        if (err) {
            if (err.kind === "Not found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.user_email}`
                })
            } else {
                res.status(500).send({ message: "Error retrieving Customer with id " + req.params.user_email })
            }
        } else res.send(data);
    })
}

// find one user
exports.findOne = (req, res) => {
    User.findById(req.params.user_ID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Not found Customer with id ${req.params.user_ID}.` })
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.user_ID
                })
            }
        } else {
            res.send(data);
        }
    })
}

// update a user
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    User.updateById(
        req.params.user_ID,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.user_ID}.`
                    })
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.user_ID
                    })
                }
            } else { res.send(data) }
        }
    )
}
exports.delete = (req, res) => {
    console.log(req.params)
    User.remove(req.params.user_ID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.user_ID}`
                })
            } else {
                res.status(500).send({
                    message: "could not delete user with ID " + req.params.user_ID
                })
            }
        } else {
            res.send({
                message: "user was deleted successfully!"
            })
        }
    })
}