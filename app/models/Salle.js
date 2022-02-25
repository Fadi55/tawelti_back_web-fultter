module.exports = (sequelize, Sequelize) => {
	const Salle = sequelize.define('Salle', {
 
     
name:{
    type: Sequelize.STRING,
},
     
RestaurantId:{
    type: Sequelize.INTEGER,
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

return Salle;
}