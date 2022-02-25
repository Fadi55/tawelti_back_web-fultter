module.exports = (sequelize, Sequelize) => {
	const EventDays = sequelize.define('EventDays', {
 
     
 
timestart:{   type: Sequelize.STRING,
},
timeend:{   type: Sequelize.STRING,
},
day:{   type: Sequelize.STRING,
},
 
EventId :{   type: Sequelize.INTEGER,
},
 
createdAt:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
},
updatedAt:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
},

 
});

return EventDays;
}