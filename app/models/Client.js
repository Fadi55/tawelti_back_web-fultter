module.exports = (sequelize, Sequelize) => {
	const Client = sequelize.define('Client', {
 
     
first_name:{
    type: Sequelize.STRING,
},
last_name:{
    type: Sequelize.STRING,
},
email:{
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

return Client;
}