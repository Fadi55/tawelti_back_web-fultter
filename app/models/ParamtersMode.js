module.exports = (sequelize, Sequelize) => {
	const ParamtersMode = sequelize.define('ParamtersMode', {
 
     

RestaurantId:{
    type: Sequelize.INTEGER,
},
     
wotol:{
    type: Sequelize.BOOLEAN,
},
 
wttolminus:{
    type: Sequelize.BOOLEAN,
},

wttolplus:{
    type: Sequelize.BOOLEAN,
},

wttolplusminus:{
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

return ParamtersMode;
}