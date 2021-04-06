var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { tables } = require('../config/db.config.js');
 
const Table = db.tables;
 


//Creation Number of table to restaurant

exports.CreateTable = (req, res) => {

    var h;
 
    const today = new Date()
    var container = [];
    var h = req.body.number
    for (i = 0; i < h; i++) {
        const tableData = {
            etat : 0,
            RestaurantId : req.body.RestaurantId,
            dateFin:0000-00-00,
            dateDebut:0000-00-00,
            heureDebut:"00:00",
            heureFin: "00:00",
            createdAt : today
            
        }
        container.push(tableData);
    }
       

       // console.log("assbaton",container)
     
    Table.bulkCreate(container)
    .then(table => {
    
        if(table){
            res.status(200).json (table)
    
        }else{
            res.send('table dont create ')
    
        }
    
    }).catch(err => { 
        res.send('errror: ' )
    
    })
}
    


exports.TurnOver = (req, res) => {
    var date = new Date();
    var current_hour = date.getTime();
    var current_minute = date.getMinutes();
    
    console.log("heure",current_hour)
    console.log("minute",current_minute)
    return Table.findAll( )
        .then(table => {
 
            if (table) {
                res.status(200).json(table)

            } else {
                res.send('table deos not exist')

            }
        }).catch(err => {
            res.send('table: ' + err)
        })
}
//update Nomber personne table


exports.UpdateNbrPxTable = (req, res) => {

    const id = req.params.id;

    Table.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Table was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update table with id=${id}. Maybe Restaurant was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Restaurant with id=" + id
            });
        });
}
