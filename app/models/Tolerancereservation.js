module.exports = (sequelize, Sequelize) => {
	const Tolerancereservation = sequelize.define('Tolerancereservation', {
 
     
        minutes:{
    type: Sequelize.INTEGER,
},
RestaurantId:{
    type: Sequelize.INTEGER,
},
     
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
}
});

return Tolerancereservation;
}