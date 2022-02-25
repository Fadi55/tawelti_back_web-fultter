var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { tables } = require('../config/db.config.js');
 
const Table = db.tables;
const Salle = db.Salles;
const SelectTableResv = db.selecttableresvs;
const Restaurant = db.restaurants;
//Creation Number of table to restaurant
exports.CreateSelectTableReservation = (req, res) => {

    const selectTable = {
        idtable: req.body.idtable,
        datestart: req.body.datestart,
        guestnumber: req.body.guestnumber,
        RestaurantId: req.body.RestaurantId,
        ZoneId: req.body.ZoneId,
        SalleId: req.body.SalleId,
        Guestname: req.body.Guestname,
        etat: req.body.etat,
        ids: req.body.ids,
    
    }
    SelectTableResv.create(selectTable)
        .then(selectTable => {

            if (selectTable) {
                res.status(200).json(selectTable)

            } else {
                res.send('selectTable dont create ')

            }
        }).catch(err => {
            res.send('errror: ')

        })
}
//get Restaurant with tablesSelected
exports.findRestaurantlwithTablesSelected = (req, res) => {

    const RestaurantId = req.params.id;
    return Restaurant.findByPk(RestaurantId, { include: ["tablesSelected"] })
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