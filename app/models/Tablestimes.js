module.exports = (sequelize, Sequelize) => {
	const Tablestimes = sequelize.define('Tablestimes', {
 
    
     
    timeNbrPx:{
        type: Sequelize.INTEGER,
       
    },

    heure:{
        type: Sequelize.INTEGER,
       
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

return Tablestimes;
}