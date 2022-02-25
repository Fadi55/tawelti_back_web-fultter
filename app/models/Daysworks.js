module.exports = (sequelize, Sequelize) => {
	const Daysworks = sequelize.define('Daysworks', {
 
     
 
RestaurantId:{
    type: Sequelize.INTEGER,
},
UserId:{
    type: Sequelize.INTEGER,
},
dayID:{
    type: Sequelize.INTEGER,
},
switchopen:{
    type: Sequelize.BOOLEAN,
},
day:{
    type: Sequelize.STRING,
},
timeStart:{
    type: Sequelize.STRING,
},
timeEnd:{
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

return Daysworks;
}