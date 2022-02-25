module.exports = (sequelize, Sequelize) => {
	const Event = sequelize.define('Event', {
 
     
name:{
    type: Sequelize.STRING,
},
RestaurantId:{
    type: Sequelize.INTEGER,
},
     
type:{
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
}
});

return Event;
}