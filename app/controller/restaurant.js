var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { restaurants } = require('../config/db.config.js');
const User = db.users;
const Restaurant = db.restaurants;

exports.findEvaluation = (req, res) => {
    const id = req.params.id;

    Restaurant.findByPk(id, { include: ["evaluations"] })
        .then(data => {
            res.send(data.evaluations);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Zone with id=" + id
            });
        });
};
exports.findAvis = (req, res) => {
    const id = req.params.id;

    Restaurant.findByPk(id, { include: ["avis"] })
        .then(data => {
            res.send(data.avis);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Zone with id=" + id
            });
        });
};


//ADD Restaurant with usersID

exports.CreateRestaurant = (req, res) => {

    const restData = {
        NomResto: req.body.NomResto,
        Description: req.body.Description,
        adresse: req.body.adresse,
        NBzone: req.body.NBzone,
        temps_ouverture: req.body.temps_ouverture,
        temps_fermeture: req.body.temps_ouverture,
        heureDebut: "00:00",
        heureFin: "00:00",
        UserId: req.body.UserId,
        etat: req.body.etat,
        budget: req.body.budget
    }

    Restaurant.create(restData)
        .then(restData => {

            if (restData) {
                res.status(200).json(restData)

            } else {
                res.send('restaurant dont create ')

            }
        }).catch(err => {
            res.send('errror: ')

        })
}


//get restaurants
exports.findAll = (req, res) => {
    // const nom = req.query.nom;
    //var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;

    Restaurant.findAll({ include: ["cuisine", "ambiance", "etablissement", "general"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving restaurants."
            });
        });
};

//get restaurant with Id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Restaurant.findByPk(id, { include: ["cuisine", "ambiance", "etablissement", "general"], })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Restaurant with id=" + id
            });
        });
};

//find restaurant by userID
exports.findOne1 = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, { include: ["restaurant"], where: ({ UserId: id }) })
        .then(data => {
            res.send(data.restaurant[0]);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Zone with id=" + id
            });
        });
};

//find restaurant events
exports.findOne2 = (req, res) => {
    const id = req.params.id;

    Restaurant.findByPk(id, { include: ["evenement"] })
        .then(data => {
            res.send(data.evenement);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Zone with id=" + id
            });
        });
};

//find restaurant floors
exports.findOne3 = (req, res) => {
    const id = req.params.id;

    Restaurant.findByPk(id, { include: ["etage"] })
        .then(data => {
            res.send(data.etage);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Zone with id=" + id
            });
        });
};

//find restaurant Rservations
exports.findOne4 = (req, res) => {
    const id = req.params.id;

    Restaurant.findByPk(id, { include: ["reservationResto"] })
        .then(data => {
            res.send(data.reservationResto);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Zone with id=" + id
            });
        });
};
//find restaurants waiters
exports.findOne5 = (req, res) => {
    const id = req.params.id;

    Restaurant.findByPk(id, { include: ["serveur"] })
        .then(data => {
            res.send(data.serveur);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Zone with id=" + id
            });
        });
};

//find restaurants ambiance
exports.findAmbiance = (req, res) => {
    const id = req.params.id;

    Restaurant.findByPk(id, { include: ["ambiance"] })
        .then(data => {
            res.send(data.ambiance);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Zone with id=" + id
            });
        });
};

//find restaurants etablissement
exports.findEtablissement = (req, res) => {
    const id = req.params.id;

    Restaurant.findByPk(id, { include: ["etablissement"] })
        .then(data => {
            res.send(data.etablissement);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Zone with id=" + id
            });
        });
};

//find restaurants cuisine
exports.findCuisine = (req, res) => {
    const id = req.params.id;

    Restaurant.findByPk(id, { include: ["cuisine"] })
        .then(data => {
            res.send(data.cuisine);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Zone with id=" + id
            });
        });
};

//find restaurants General
exports.findGenerals = (req, res) => {
    const id = req.params.id;

    Restaurant.findByPk(id, { include: ["general"] })
        .then(data => {
            res.send(data.general);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Zone with id=" + id
            });
        });
};



//get Restaurant with tables
exports.findRestaurantlwithTables = (req, res) => {

    const RestaurantId = req.params.id;
    return Restaurant.findByPk(RestaurantId, { include: ["table"] })
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

exports.GetMAxIDTable = (req, res) => {
    const RestaurantId = req.params.id;

    return Restaurant.findByPk(RestaurantId, {
        include: ["table"], attributes: [
            [sequelize.fn('MAX', sequelize.col('id')), 'id'],
        ],
        group: ['id']
    })
        .then(maxIdtable => {

            if (maxIdtable) {


                res.send(maxIdtable)

            } else {
                res.send('maxIdtable deos not exist')

            }
        }).catch(err => {
            res.send('errror: ' + err)
        })
}

//update Restaurant

exports.UpdateRestaurent = (req, res) => {

    const id = req.params.id;

    Restaurant.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Restaurant was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Restaurant with id=${id}. Maybe Restaurant was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Restaurant with id=" + id
            });
        });
}

