const { INTEGER } = require('sequelize');
const db = require('../config/db.config.js');
const Restaurant = db.restaurants;
const Favorite = db.favorites;
const Op = db.Sequelize.Op;

// Create and Save a new etage
exports.create = (req, res) => {
    // Validate request
    /*if (!req.body.nom) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }*/

    // Create a etage
    const favorite = {
        RestaurantId: req.body.RestaurantId,
        UserId:req.body.UserId,
        //published: req.body.published ? req.body.published : false
    };

    // Save etage in the database
    Favorite.create(favorite)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the avis."
            });
        });
};
// Retrieve all etages from the database.
exports.findAll = (req, res) => {
    // const nom = req.query.nom;
    //var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;

    Favorite.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving ambiances."
            });
        });
};

exports.findFavorisByUserId =async (req, res) => {
        const id = req.params.id;
    try{

    Favorite.findAll({where:{UserId:id}})
    .then(container=>{
   res.send(container);
    });
        }catch(err){
res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving ambiances."
            });
    }
};


// Find a single etage with an id
exports.findOne =async (req, res) => {
    const id = req.params.id;
   // let restaurant = Restaurant.findByPk(req.params.id);
   const favorite = await Favorite.findByPk(id);
    Restaurant.findByPk(favorite.RestaurantId)
        .then(data => {
        
            res.send({restaurant: data });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving ambiance with id=" + id
            });
        });
};

exports.findByUserId =async (req, res) => {
    const id = req.params.id;
   // let restaurant = Restaurant.findByPk(req.params.id);
   //const favorite = await Favorite.findByPk(id);
    Favorite.findOne({UserId:id})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving ambiance with id=" + id
            });
        });
};


// Update a etage by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Favorite.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Favorite was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Favorite with id=${id}. Maybe Ambiance was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Ambiance with id=" + id
            });
        });
};

// Delete a etage with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Favorite.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Favorite was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Favorite with id=${id}. Maybe ambiance was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not ambiance with id=" + id
            });
        });
};

// Delete all etages from the database.
exports.deleteAll = (req, res) => {
    Favorite.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} ambiances were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all ambiances."
            });
        });
};
