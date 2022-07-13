var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { tables } = require('../config/db.config.js');
 
const Zone = db.Zones;
const Table = db.tables;
 
const Restaurant = db.restaurants;
//Create Zone
exports.CreateZone = (req, res) => {
    var container = [];

    for (i = 0; i < req.body.length; i++) {
        const book = {
         
            RestaurantId: req.body[i].RestaurantId,
            TableId: req.body[i].TableId,
            name: req.body[i].name,
            color: req.body[i].color
        }
        container.push(book);
    }
   
    Zone.bulkCreate(container)
       

            .then(container => {

                if (container) {
                    res.status(200).json(container)
    
                } else {
                    res.send('book dont create ')
    
                }
            }).catch(err => {
                res.send('errror: ')
    
            })
    
        
}

//get Restaurant with zones
exports.findRestaurantlwithZones = (req, res) => {
    const RestaurantId = req.params.id;
    
    return Restaurant.findByPk(RestaurantId, { include: ["zones"] })
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

//get zones with canvas
exports.findZonelwithCanvas = (req, res) => {
    const ZoneId = req.params.id;
    
    return Zone.findByPk(ZoneId, { include: ["canvas"] })
        .then(zone => {

            if (zone) {
       
 
                res.send(zone)
               
            } else {
                res.send('restaurant deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
}



//get Restaurant with salles
exports.findRestaurantlwithSalles = (req, res) => {
    const RestaurantId = req.params.id;
    
    return Restaurant.findByPk(RestaurantId, { include: ["salles"] })
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
