module.exports = (sequelize, Sequelize) => {
	const Worker = sequelize.define('Worker', {
 
     
first_name:{
    type: Sequelize.STRING,
},

last_name:{
    type: Sequelize.STRING,
},
     
RestaurantId:{
    type: Sequelize.INTEGER,
},
ZoneId:{
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

return Worker;
}