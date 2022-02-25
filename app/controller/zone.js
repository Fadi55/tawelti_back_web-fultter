var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { tables } = require('../config/db.config.js');
 
const Zone = db.Zones;
const Table = db.tables;
 
const Restaurant = db.restaurants;
//Create Zone
exports.CreateZone = (req, res) => {

    const zonedata = {
        name: req.body[0].name,
        RestaurantId: req.body[0].RestaurantId,
    }

    console.log("first",req.body)
    req.body[1].forEach((value2) => {
        console.log("tyyyyyyy",value2);
    })
    Zone.create(zonedata)
        .then(zonedata => {

            if (zonedata) {
                res.status(200).json(zonedata)
                var promises = [];
                req.body[1].forEach(function(valueups){
                   promises.push(Table.update({ ZoneId:zonedata.id
                
                
                
                },{where : {id:valueups.id}}));
                });
                Promise.all(promises).then(function(){
                    res.status(200)
                }, function(err){
                    console.log("non")
                });

            
 
            } 
            
            
            else {
                res.send('zone dont create ')

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
