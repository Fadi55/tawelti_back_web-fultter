module.exports = (sequelize, Sequelize) => {
	const ParamtersReservations = sequelize.define('ParamtersReservations', {
 
     

RestaurantId:{
    type: Sequelize.INTEGER,
},
     
tawelti_smart_on:{
    type: Sequelize.BOOLEAN,
},
tawelti_smart_off:{
    type: Sequelize.BOOLEAN,
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

return ParamtersReservations;
}