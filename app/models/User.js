module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('User', {
 
    googleId: {
      type: Sequelize.STRING
    },
  
    facebookId: {
      type: Sequelize.STRING,
    },
    
first_name:{
    type: Sequelize.STRING,
},
last_name:{
    type: Sequelize.STRING,
},
email:{
    type: Sequelize.STRING,
},
password:{
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

return User;
}