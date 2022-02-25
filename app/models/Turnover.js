module.exports = (sequelize, Sequelize) => {
	const Turnover = sequelize.define('Turnover', {
 
     
taille:{
    type: Sequelize.INTEGER,
},
RestaurantId:{
    type: Sequelize.INTEGER,
},
     
minutes:{
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

return Turnover;
}