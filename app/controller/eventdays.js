var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { tables } = require('../config/db.config.js');
const Event = db.events;
const Eventdays = db.eventdays;
// const Restaurant = db.restaurants;
  
//CreateEventdays
exports.CreateEventdays = (req, res) => {


    var container = [];
    
    var i
                for (i = 0; i < req.body.length; i++) {
        const tableData = {
            day: req.body[i].day,
            timeend: req.body[i].timeend,
            timestart: req.body[i].timestart,
            EventId:req.body[i].EventId,
        }
        container.push(tableData);
    }

   
    Eventdays.bulkCreate(container)
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


//get event with eventday
exports.findEventdayslwithEvent = (req, res) => {
    const EventId = req.params.id;
    
    return Event.findByPk(EventId, { include: ["eventDays"] })
        .then(events => {

            if (events) {
       
 
                res.send(events)
               
            } else {
                res.send('events deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
}