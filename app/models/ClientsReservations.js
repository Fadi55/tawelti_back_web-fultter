module.exports = (sequelize, Sequelize) => {
	const ClientReservations = sequelize.define('ClientReservations', {
 
      
RestaurantId:{
    type: Sequelize.INTEGER,
},
name:{
    type: Sequelize.STRING,
},
telephone:{
    type: Sequelize.STRING,
},
email:{
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

return ClientReservations;
}