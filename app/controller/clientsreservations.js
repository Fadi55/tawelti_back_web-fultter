var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { tables } = require('../config/db.config.js');
 
const ClientsReservations = db.Clientsreservations;
const Restaurant = db.restaurants;
//Create Client Reservations
exports.CreateClientReservations = async (req, res) => {
    
    if (!req.body.name || !req.body.RestaurantId) {
        return res.status(400).json({ 'message': 'name and RestaurantId names are required' });
    }

    try {
      
        const result = await ClientsReservations.create({
            name: req.body.name,
            RestaurantId: req.body.RestaurantId
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}



//get Restaurant with Salles
exports.findClientWithName = (req, res) => {
    const RestaurantId = req.params.id;
   
   
    return Restaurant.findByPk(RestaurantId, { include: ["clientsreservations"] })
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