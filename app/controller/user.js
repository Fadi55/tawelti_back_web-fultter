var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { restaurants } = require('../config/db.config.js');
const BookWaitSeat = require('../models/BookWaitSeat.js');
const User = db.users;
const Restaurant = db.restaurants;


//find Restaurant BY ID user
exports.findRestaurantlByIdUser = (req, res) => {
    console.log("rrr")
    UserId = req.params.UserId
    console.log("eee", UserId)
    return User.findByPk(UserId, { include: ["restaurant"] })
        .then(user => {

            if (user) {
                res.status(200).json(user)

            } else {
                res.send('user deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
}

//find Restaurant BY ID user
exports.findBWSByIdUser = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, { include: ["bookwaitseat"], where: ({ UserId: id }) })
        .then(data => {
            res.send(data.bookwaitseat);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving bws with id=" + id
            });
        });
}
exports.findAvisByIdUser = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, { include: ["avis"], where: ({ UserId: id }) })
        .then(data => {
            res.send(data.avis);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving avis with id=" + id
            });
        });
}

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    /*const nom = req.query.nom;
    var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;*/

    User.findAll({ include: ["reservation"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Zones."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, { include: ["restaurant", "bookwaitseat"], model: { Restaurant, User }, where: ({ UserId: id }) })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Zone with id=" + id
            });
        });
};

// Update user by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Etage with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};