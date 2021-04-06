module.exports = (sequelize, Sequelize) => {
	const Table = sequelize.define('Table', {
 
    Description:{
        type: Sequelize.STRING,
    },
    etat:{
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
    RestaurantId:{
        type: Sequelize.INTEGER,
       
    },
    
    tableNbrPx:{
        type: Sequelize.INTEGER,
       
    },
   
    dateDebut:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        default : 0
    },
    dateFin:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        default : 0
    },

   heureDebut:{
        type: Sequelize.TIME,
       
        
    },
    heureFin:{
        type: Sequelize.TIME,
        
   
    },
   
});

return Table;
}