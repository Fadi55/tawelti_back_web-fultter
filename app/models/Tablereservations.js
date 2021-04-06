module.exports = (sequelize, Sequelize) => {
	const Tablereservations = sequelize.define('Tablereservations', {
 
    Description:{
        type: Sequelize.STRING,
    },
 
   
    createdAt:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
   
   
    dateDebut:{
        type: Sequelize.DATE,
 
    },
    dateFin:{
        type: Sequelize.DATE,
        
    },

  
   
});

return Tablereservations;
}