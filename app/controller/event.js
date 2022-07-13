var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { tables } = require('../config/db.config.js');
 
const Event = db.events;
const Restaurant = db.restaurants;
  
const fs = require("fs");

const uploadFiles = async (req, res) => {
 
  };
//Create Events
exports.CreateEvent = (req, res) => {
    try {
        console.log(req.file,__basedir);
        console.log(req.body)
    
        if (req.file == undefined) {
          return res.send(`You must select a file.`);
        }
    
        Event.create({
          RestaurantId:req.body.RestaurantId,
          nameEvent: req.body.nameEvent,
          type: req.file.mimetype,
          namepic: req.file.originalname,
          data: fs.readFileSync(
            __basedir + "/uploads/events/" + req.file.filename
          ),
        }).then((image) => {
          fs.writeFileSync(
            __basedir + "/tmp/events/" + image.name,
            image.data
          );
    
       
  
          return  res.status(201).json(`File has been uploaded.`);
        });
      } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
      }
  
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

