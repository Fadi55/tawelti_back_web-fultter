module.exports = (sequelize, Sequelize) => {
	const Event = sequelize.define('Event', {
 
 
RestaurantId:{
    type: Sequelize.INTEGER,
},
     
nameEvent:{
    type: Sequelize.STRING,
},
description:{
    type: Sequelize.STRING,
},
datedebut:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
},
datefin:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
},
 
createdAt:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
},
updatedAt:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
},
namepic:{
    type: Sequelize.STRING,
},
data:{
    type: Sequelize.STRING,
},
});

return Event;
}