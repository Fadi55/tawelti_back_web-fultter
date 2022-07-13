
const db = require('../config/db.config.js');
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require('../config/keys');

const bcrypt = require("bcrypt");
const { users } = require('../config/db.config.js');
let nodemailer = require('nodemailer');
// const common_methods = require('../helpers/common_methods')
process.env.SECRET_KEY = 'secret'
const User = db.users;
const PicturePrincips = db.pictureprincips
const path = require("path");
const fs = require("fs");
 
const getPicturePrincipal = async (req, res) => {
  const RestaurantId = req.params.id;
  
  PicturePrincips.findAll( {
    where: { RestaurantId: RestaurantId }
})
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message: "Error retrieving ambiance with id=" + id
      });
  });
}

const uploadFiles = async (req, res) => {
    try {
      console.log(req.file,__basedir);
  
      if (req.file == undefined) {
        return res.send(`You must select a file.`);
      }
  
      PicturePrincips.create({
        RestaurantId:req.body.RestaurantId,
        type: req.file.mimetype,
        name: req.file.originalname,
        data: fs.readFileSync(
          __basedir + "/uploads/profile/" + req.file.filename
        ),
      }).then((image) => {
        fs.writeFileSync(
          __basedir + "/tmp/profile/" + image.name,
          image.data
        );
  
     

        return  res.status(201).json(`File has been uploaded.`);
      });
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying upload images: ${error}`);
    }
  };
   

//   const home = (req, res) => {
//     return res.sendFile(path.join(`${__dirname}/../views/index.html`));
//   };
  module.exports = {
    uploadFiles,
    getPicturePrincipal,
    
  };
