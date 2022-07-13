const db = require('../config/db.config.js');
const Paramtersmodes = db.paramtersmodes;
const Op = db.Sequelize.Op;



exports.update = (req, res) => {
    
    const id = req.params.id;
console.log(req.body)
Paramtersmodes.update(req.body, {
        where: { RestaurantId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "parametremodes was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Paramtersreservations with id=${id}. Maybe parametremodes was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Paramtersreservations with id=" + id
            });
        });
};


// exports.create = (req, res) => {
//     const id = req.params.id;
//     const Paramtersreservationss = {
//         RestaurantId: id,
//         tawelti_smart_on: 0,
//         tawelti_smart_off: 0,
   
//         //published: req.body.published ? req.body.published : false
//     };

//     // Save etage in the database
//     Paramtersreservations.create(Paramtersreservationss)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while creating the avis."
//             });
//         });

// }


exports.getModes = (req, res) => {

 
    const RestaurantId = req.params.id;
    
    Paramtersmodes.findAll( {
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