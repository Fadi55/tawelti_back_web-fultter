var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { tables } = require('../config/db.config.js');
 
const tols = db.tolerancereservations;
const Restaurant = db.restaurants;
  
//Create ToleranceReservations
exports.CreateToleranceReservations = (req, res) => {

    const tolerance = {
        description: req.body.description,
        minutes: req.body.minutes,
        RestaurantId: req.body.RestaurantId,
    }
    tols.create(tolerance)
        .then(tolerance => {

            if (tolerance) {
                res.status(200).json(tolerance)

            } else {
                res.send('tolerance dont create ')

            }
        }).catch(err => {
            res.send('errror: ')

        })
}

//get turnover with resto
exports.findRestaurantlwithToleranceReservations = (req, res) => {
    const RestaurantId = req.params.id;
    
    return Restaurant.findByPk(RestaurantId, { include: ["tolerancereservations"] })
        .then(turnover => {

            if (turnover) {
       
 
                res.send(turnover)
               
            } else {
                res.send('turnover deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
}
