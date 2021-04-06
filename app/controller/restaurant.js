var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { restaurants } = require('../config/db.config.js');
const User = db.users;
const Restaurant = db.restaurants;



//ADD Restaurant with usersID

exports.CreateRestaurant = (req, res) => {

    const restData = {
        NomResto: req.body.NomResto,
        Description: req.body.Description,
        adresse: req.body.adresse,
        NBzone: req.body.NBzone,
        temps_ouverture: req.body.temps_ouverture,
        temps_fermeture: req.body.temps_ouverture,
        heureDebut: "00:00",
        heureFin: "00:00",
        
        UserId: req.body.UserId,
    }

    Restaurant.create(restData)
        .then(restData => {

            if (restData) {
                res.status(200).json(restData)

            } else {
                res.send('restaurant dont create ')

            }
        }).catch(err => {
            res.send('errror: ')

        })
}







//get Restaurant with tables
exports.findRestaurantlwithTables = (req, res) => {

    RestaurantId = req.body.RestaurantId
    return Restaurant.findByPk(RestaurantId, { include: ["table"] })
        .then(restaurant => {

            if (restaurant) {
                res.status(200).json(restaurant)

            } else {
                res.send('restaurant deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
}

//update Restaurant

exports.UpdateRestaurent = (req, res) => {

    const id = req.params.id;

    Restaurant.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Restaurant was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Restaurant with id=${id}. Maybe Restaurant was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Restaurant with id=" + id
            });
        });
}

