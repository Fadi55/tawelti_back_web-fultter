var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { tables } = require('../config/db.config.js');
 
const Worker = db.workers;
 
 
const Restaurant = db.restaurants;
//Create Worker
exports.CreateWorker = (req, res) => {

    const workerdata = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        RestaurantId: req.body.RestaurantId,
    }
    Worker.create(workerdata)
        .then(workerdata => {

            if (workerdata) {
                res.status(200).json(workerdata)

            } else {
                res.send('worker dont create ')

            }
        }).catch(err => {
            res.send('errror: ')

        })
}
 
//get Restaurant with workers
exports.findRestaurantlwithWorkers = (req, res) => {
    const RestaurantId = req.params.id;
    
    return Restaurant.findByPk(RestaurantId, { include: ["workers"] })
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
 