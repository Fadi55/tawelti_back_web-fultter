module.exports = (sequelize, Sequelize) => {
	const ParamtersCollages = sequelize.define('ParamtersCollages', {
 
     

RestaurantId:{
    type: Sequelize.INTEGER,
},
     
twotables:{
    type: Sequelize.BOOLEAN,
},
threetables:{
    type: Sequelize.BOOLEAN,
},
fourables:{
    type: Sequelize.BOOLEAN,
},
allables:{
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

return ParamtersCollages;
}