var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const jwt = require("jsonwebtoken")
 const { JWT_SECRET } = require('../config/keys');

const bcrypt = require("bcrypt");
const { users } = require('../config/db.config.js');
let nodemailer = require('nodemailer');
const common_methods = require('../helpers/common_methods')
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
           res.json({token: token,user})
           
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
    res.json( {token: token,user})
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
signToken = user => {
  return jwt.sign({
    iss: 'CodeWorkr',
    sub: user,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

 exports.googleOAuth =async (req, res) => {
    // Generate token
    console.log('got here');
    const token = signToken(req.user);
    res.status(200).json({ token });
  }

    exports.facebookOAuth= async (req, res, next) => {
    // Generate token
        console.log('got here');
    const token = signToken(req.user);
    const user =  User.findOne({
        where: {
            email: req.user.email
        }
    });
    const userData=req.user;
    res.status(200).json({ token,userData});
  }


  exports.updatePassword = async (req, res) => {
    const user = await User.findOne({where:{ email: req.params.mail} })
    console.log(user);
    try {
        if (user) {
            //  user found
            const newPassword = common_methods.generateRandomPassword();
            const hash = bcrypt.hashSync(newPassword, 10);
            console.log(newPassword);
            /* const updatedUser = await User.findOneAndUpdate({ email: req.params.mail }, {
                $set: {
                    password: newPassword.toUpperCase()
                }
            }, { lean: true })  */

       const updatedUser = await  User.update(
  { password: hash },
  { where: { email: req.params.mail} }
);


           if (updatedUser) {
                  //password updated successfully
                common_methods.sendMail(req.params.mail, newPassword.toUpperCase())
                return res.status(201).json({
                    ok: true,
                    data:user,
                    message: "MAIL_SUCCESS" + " " + newPassword.toUpperCase()
                });
            }

       } else {
              //invalid mail address
            return res.status(404).json({
                ok: false,
                message: "NOT_FOUND"
            })
       }  
        
}catch (error) {
        return res.status(500).json({
            ok: false,
            message: "SERVER_ERROR"
        })
    } 
}
exports.checkUser = async (req, res) => {
    try {
        const user = await User.findOne({ where : {
            email : req.body.email
        }
    });
        if (user) {
            //  user found
            const match = await bcrypt.compare(req.body.password,user.password)
            if(match) {
                return res.status(200).json({
                    ok: true,
                    message: "VALID_USER"
                })
            } else {
                //user found, password was wrong
                return res.status(404).json({
                    ok: false,
                    message: "INVALID_USER_"
                })
            }            
        } else {
            //  user not found
            return res.status(404).json({
                ok: false,
                message: "INVALID_USER"
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "SERVER_ERROR"
        })
    }
}



 
