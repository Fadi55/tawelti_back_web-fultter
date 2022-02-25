module.exports = (sequelize, Sequelize) => {
	const TableBlocked = sequelize.define('TableBlocked', {
 
   
        tableId:{
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

 
});

return TableBlocked;
}