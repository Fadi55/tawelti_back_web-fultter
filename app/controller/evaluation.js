const db = require('../config/db.config.js');
const Evaluation = db.evaluations;
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
    const evaluation = {
        note_food: req.body.note_food,
        note_service:req.body.note_service,
        note_prix:req.body.note_prix,
        note_ambiance:req.body.note_ambiance,
        RestaurantId: req.body.RestaurantId,
        UserId:req.body.UserId,
        //published: req.body.published ? req.body.published : false
    };

    // Save etage in the database
    Evaluation.create(evaluation)
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

    Evaluation.findAll()
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

    Evaluation.findByPk(id)
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

    Evaluation.update(req.body, {
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

    Evaluation.destroy({
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
    Evaluation.destroy({
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
