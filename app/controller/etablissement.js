const db = require('../config/db.config.js');
const Etablissement = db.etablissement;
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
    const etablissement = {
        type: req.body.type,
        RestaurantId: req.body.RestaurantId,
        //published: req.body.published ? req.body.published : false
    };

    // Save etage in the database
    Etablissement.create(etablissement)
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

    Etablissement.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving etablissements."
            });
        });
};

// Find a single etage with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Etablissement.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving etablissement with id=" + id
            });
        });
};


// Update a etage by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Etablissement.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Etablissement was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Etablissement with id=${id}. Maybe Etablissement was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Etablissement with id=" + id
            });
        });
};

// Delete a etage with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Etablissement.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Etablissement was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Etablissement with id=${id}. Maybe etablissement was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not etablissement with id=" + id
            });
        });
};

// Delete all etages from the database.
exports.deleteAll = (req, res) => {
    Etablissement.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} etablissements were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all etablissements."
            });
        });
};
