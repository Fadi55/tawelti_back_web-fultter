module.exports = (sequelize, Sequelize) => {
	const Zone = sequelize.define('Zone', {
 
     
name:{
    type: Sequelize.STRING,
},
color:{
    type: Sequelize.STRING,
},
RestaurantId:{
    type: Sequelize.INTEGER,
},
 
TableId:{
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

return Zone;
}