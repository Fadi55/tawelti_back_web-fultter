const db = require('../config/db.config.js');
const Cuisine = db.cuisine;
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
    const cuisine = {
        type: req.body.type,
        RestaurantId: req.body.RestaurantId,
        //published: req.body.published ? req.body.published : false
    };

    // Save etage in the database
    Cuisine.create(cuisine)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the etage."
            });
        });
};
// Retrieve all etages from the database.
exports.findAll = (req, res) => {
    // const nom = req.query.nom;
    //var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;

    Cuisine.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cuisines."
            });
        });
};

// Find a single etage with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Cuisine.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving cuisine with id=" + id
            });
        });
};


// Update a etage by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Cuisine.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cuisine was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Cuisine with id=${id}. Maybe Etage was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Cuisine with id=" + id
            });
        });
};

// Delete a etage with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Cuisine.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cuisine was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Cuisine with id=${id}. Maybe Cuisine was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not Cuisine with id=" + id
            });
        });
};

// Delete all etages from the database.
exports.deleteAll = (req, res) => {
    Cuisine.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} cuisines were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all cuisines."
            });
        });
};
