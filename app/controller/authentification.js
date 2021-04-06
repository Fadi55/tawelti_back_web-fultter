var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const jwt = require("jsonwebtoken")
 
const bcrypt = require("bcrypt");
const { users } = require('../config/db.config.js');

process.env.SECRET_KEY= 'secret'
const User = db.users;
 
 //LOGIN
exports.login = (req, res) => {
    
    console.log("req.body.email",req.body.email)
  
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(bcrypt.compareSync(req.body.password, user.password)){
           let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
               expiresIn: 1440
           }) 
           res.json({token: token})
        }else{
            res.send('User does not exist')
        }
    })
    .catch(err =>{
        res.send('error'+err)
    })
}

//REGISTER
exports.register = (req, res) => {
    const today = new Date()
    const userData = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        password : req.body.password,
    created : today
    
    
    }
    User.findOne( {
        where : {
            email : req.body.email
        }
    }).then(user =>{
        if(!user){
            const hash = bcrypt.hashSync(userData.password, 10)
            userData.password = hash
            User.create(userData)
            .then(user => {
    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,
        {
            expiresIn:1440
        }
        )
    res.json({token: token})
            })
            .catch(err => {
                res.send('error:'+err)
            })
        }else{
            res.json({error:'user already exixts'})
        }
    })
    .catch(err => {
        res.send('error;'+err)
    })
}

//PROFILE
exports.profile = (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
 
    User.findOne({
        where: {
            id: decoded.id
        }
    }).then(user => {
    
        if(user){
            res.status(200).json (user)
    
        }else{
            res.send('user deos not exist')
    
        }
    }).catch(err => { 
        res.send('errror: '+err)
    })
}



 
