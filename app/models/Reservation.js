module.exports = (sequelize, Sequelize) => {
	const Reservation = sequelize.define('Reservation', {
 
     
description:{
    type: Sequelize.STRING,
},
 
createdAt:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
},
updatedAt:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
},
heureDebut:{
    type: Sequelize.TIME,
    defaultValue: Sequelize.NOW,
    default : 0
},
heureFin:{
    type: Sequelize.TIME,
    defaultValue: Sequelize.NOW,
    default : 0
},
});

return Reservation;
}