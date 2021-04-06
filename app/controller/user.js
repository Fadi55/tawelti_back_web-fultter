var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { restaurants } = require('../config/db.config.js');
const User = db.users;
const Restaurant = db.restaurants;
 

//find Restaurant BY ID user
  exports.findRestaurantlByIdUser = (req,res)  => {
      console.log("rrr")
	UserId=req.body.UserId
	return User.findByPk(UserId, { include: ["reservationGerant"] })
	.then(user => {
    
        if(user){
            res.status(200).json (user)
    
        }else{
            res.send('user deos not exist')
    
        }
    }).catch(err => { 
        res.send('errror: '+err)
    })
}