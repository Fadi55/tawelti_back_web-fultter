var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { tables } = require('../config/db.config.js');
 
const Turnover = db.turnovers;
const Restaurant = db.restaurants;
  
//Create Turnover
exports.CreateTurnover = (req, res) => {

    const turnover = {
        taille: req.body.taille,
        minutes: req.body.minutes,
        RestaurantId: req.body.RestaurantId,
    }
    Turnover.create(turnover)
        .then(turnover => {

            if (turnover) {
                res.status(200).json(turnover)

            } else {
                res.send('turnover dont create ')

            }
        }).catch(err => {
            res.send('errror: ')

        })
}

//get turnover with resto
exports.findRestaurantlwithTurnover = (req, res) => {
    const RestaurantId = req.params.id;
    
    return Restaurant.findByPk(RestaurantId, { include: ["turnovers"] })
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


//delete turnover
exports.deleteTurnover = (req, res) => {
    const id = req.params.id;
console.log("iiiid",id)
    Turnover.destroy( {
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

