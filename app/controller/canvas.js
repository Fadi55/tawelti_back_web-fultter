var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { tables } = require('../config/db.config.js');
 
const canvas = db.Canvases;
 
 
const Restaurant = db.restaurants;
//Create Canvas

exports.CreateCanvas = (req, res) => {

    const canvasData = {
        data: req.body.data,
    }

    canvas.create(canvasData)
        .then(canvasData => {

            if (canvasData) {
                res.status(200).json(canvasData)

            } else {
                res.send('canvas dont create')

            }
        }).catch(err => {
            res.send('errror: ')

        })
}

//get Restaurant with canvas
exports.findRestaurantlwithCanvas = (req, res) => {

    RestaurantId = 24
    return Restaurant.findByPk(RestaurantId, { include: ["canvas"] })
        .then(restaurant => {

            if (restaurant) {
       
 
                res.send(restaurant.canvas)
               
            } else {
                res.send('restaurant deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
}
//get CAnvas with zone