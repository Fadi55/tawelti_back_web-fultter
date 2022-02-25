const db = require('../config/db.config.js');
const Avis = db.avis;
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
    const avis = {
        text: req.body.text,
        RestaurantId: req.body.RestaurantId,
        UserId:req.body.UserId,
        //published: req.body.published ? req.body.published : false
    };

    // Save etage in the database
    Avis.create(avis)
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

    Avis.findAll()
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

// Find a single etage with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Avis.findByPk(id)
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

    Avis.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Ambiance was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Ambiance with id=${id}. Maybe Ambiance was not found or req.body is empty!`
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

    Avis.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Ambiance was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Ambiance with id=${id}. Maybe ambiance was not found!`
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
    Avis.destroy({
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
