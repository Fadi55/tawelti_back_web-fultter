const db = require('../config/db.config.js');
const Paramtersreservations = db.paramtersreservations;
const Op = db.Sequelize.Op;



exports.update = (req, res) => {
    
    const id = req.params.id;
console.log(req.body)
    Paramtersreservations.update(req.body, {
        where: { RestaurantId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Ambiance was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Paramtersreservations with id=${id}. Maybe Ambiance was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Paramtersreservations with id=" + id
            });
        });
};


exports.create = (req, res) => {
    const id = req.params.id;
    const Paramtersreservationss = {
        RestaurantId: id,
        tawelti_smart_on: 0,
        tawelti_smart_off: 0,
   
        //published: req.body.published ? req.body.published : false
    };

    // Save etage in the database
    Paramtersreservations.create(Paramtersreservationss)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the avis."
            });
        });

}

exports.getParam = (req, res) => {

 
    const RestaurantId = req.params.id;
    
    Paramtersreservations.findAll( {
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