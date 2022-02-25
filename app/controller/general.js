const db = require('../config/db.config.js');
const General = db.general;
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
    const general = {
        type: req.body.type,
        RestaurantId: req.body.RestaurantId,
        //published: req.body.published ? req.body.published : false
    };

    // Save etage in the database
    General.create(general)
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
