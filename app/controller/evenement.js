const db = require('../config/db.config.js');
const Evenement = db.evenements;
const Op = db.Sequelize.Op;

// Create and Save a new evenement
exports.create = (req, res) => {
    // Validate request
    /*if (!req.body.nom) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }*/

    // Create a evenement
    const evenement = {
        category: req.body.category,
        nom: req.body.nom,
        Description: req.body.Description,
        RestaurantId: req.body.RestaurantId,
        /* heureDebut: req.body.heureDebut,
         heureFin: req.body.heureFin,
         dateDebut: req.body.dateDebut,
         dateFin: req.body.dateFin,*/

        //published: req.body.published ? req.body.published : false
    };

    // Save evenement in the database
    Evenement.create(evenement)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the evenement."
            });
        });
};
// Retrieve all evenement from the database.
exports.findAll = (req, res) => {
    const nom = req.query.nom;
    var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;

    Evenement.findAll({ where: condition, include: ["filesEvent"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving evenement."
            });
        });
};

// Find a single evenement with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Evenement.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving evenement with id=" + id
            });
        });
};

// Update a evenement by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Evenement.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "evenement was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update evenement with id=${id}. Maybe evenement was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating evenement with id=" + id
            });
        });
};

// Delete a evenement with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Evenement.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "evenement was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete evenement with id=${id}. Maybe evenement was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete evenement with id=" + id
            });
        });
};

// Delete all evenement from the database.
exports.deleteAll = (req, res) => {
    Evenement.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} evenement were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all evenement."
            });
        });
};
