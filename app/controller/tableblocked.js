var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { tables } = require('../config/db.config.js');
const Tableblocked = db.tableblockeds;
 
 
const Restaurant = db.restaurants;
//Create TableBlocked
exports.CreateTableBlocked = (req, res) => {
    var container = [];
     
    var i
    for (i = 0; i < req.body.length; i++) {
        const Tableblockeddata = {
         
            RestaurantId: req.body[i].RestaurantId,
            dateDebut: req.body[i].dateDebut,
            dateDateFin: req.body[i].DateFin,
            tableId: req.body[i].id
        }
        container.push(Tableblockeddata);
    }

    Tableblocked.bulkCreate(container)
        .then(container => {

            if (container) {
                res.status(200).json(container)

            } else {
                res.send('container dont create ')

            }
        }).catch(err => {
            res.send('errror: ')

        })
}