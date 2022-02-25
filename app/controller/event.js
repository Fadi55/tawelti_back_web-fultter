var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { tables } = require('../config/db.config.js');
 
const Event = db.events;
const Restaurant = db.restaurants;
  
//Create Events
exports.CreateEvent = (req, res) => {

    const event = {
        name: req.body.name,
        type: req.body.type,
        RestaurantId: req.body.RestaurantId,
    }
    Event.create(event,req.body)
        .then(event => {

            if (event) {
                res.status(200).json(event)
 
            } else {
                res.send('event dont create ')

            }
        }).catch(err => {
            res.send('errror: ')

        })
}

//get event with resto
exports.findRestaurantlwithEvent = (req, res) => {
    const RestaurantId = req.params.id;
    
    return Restaurant.findByPk(RestaurantId, { include: ["events"] })
        .then(restaurant => {

            if (restaurant) {
       
 
                res.send(restaurant)
               
            } else {
                res.send('restaurant deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
}

//delete event
exports.deleteEvent = (req, res) => {
    const id = req.params.id;
 
    Event.destroy( {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "event was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update event with id=${id}. Maybe event was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating event with id=" + id
            });
        });
}

