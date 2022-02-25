module.exports = (sequelize, Sequelize) => {
	const Table = sequelize.define('Table', {
 
    description:{
        type: Sequelize.STRING,
    },
    etat:{
        type: Sequelize.INTEGER,
       
    },
    ids: {
        type: Sequelize.UUID,
        primaryKey: true
      },
    id:{
        type: Sequelize.INTEGER,
         
    },
    tolerance:{
        type: Sequelize.INTEGER,
         
    },
   
    typeTable:{
        type: Sequelize.STRING,
    },

    classIdtable:{
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
    RestaurantId:{
        type: Sequelize.INTEGER,
       
    },
    ZoneId:{
        type: Sequelize.INTEGER,
       
    },
    numero:{
        type: Sequelize.INTEGER,
       
    },
     top:{
        type: Sequelize.STRING,
       
    },
    left:{
        type: Sequelize.STRING,
        field: 'lefts',
       
    },
    text:{
        type: Sequelize.STRING,
       
    },
    price:{
        type: Sequelize.STRING,
       
    },
    class:{
        type: Sequelize.STRING,
       
    },
    class2:{
        type: Sequelize.STRING,
       
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