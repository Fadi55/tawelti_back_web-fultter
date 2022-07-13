const db = require('../config/db.config.js');
const General = db.general;
const Op = db.Sequelize.Op;
 
const Restaurant = db.restaurants;
// Create and Save a new etage
exports.create = (req, res) => {
    // Validate request
    /*if (!req.body.nom) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }*/
    var container = [];
    for (i = 0; i < req.body.length; i++) {
        const book = {
            type: req.body[i].type,
            RestaurantId: req.body[i].RestaurantId,
            checked: req.body[i].checked,

        }
        container.push(book);
    }

  

    // Save etage in the database
    General.bulkCreate(container)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the etablissement."
            });
        });
};
// Retrieve all etages from the database.
exports.findAll = (req, res) => {
    // const nom = req.query.nom;
    //var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;

    General.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving generals."
            });
        });
};

// Find a single etage with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    General.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving general with id=" + id
            });
        });
};

//get Restauratant with General Parametre
//get Restaurant with Salles
exports.findRestaurantlwithGenerale = (req, res) => {
    const RestaurantId = req.params.id;
    
    return Restaurant.findByPk(RestaurantId, { include: ["general"] })
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

// Update a etage by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    General.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "general was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update general with id=${id}. Maybe General was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating general with id=" + id
            });
        });
};

// Delete a etage with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    General.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "general was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete general with id=${id}. Maybe general was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not general with id=" + id
            });
        });
};

// Delete all etages from the database.
exports.deleteAll = (req, res) => {
    General.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} generals were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all generals."
            });
        });
};
