module.exports = (sequelize, Sequelize) => {
	const SelectTableResv = sequelize.define('SelectTableResv', {
 
        idtable:{
        type: Sequelize.STRING,
    },
    ids:{
        type: Sequelize.STRING,
    },
    datestart:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    guestnumber:{
        type: Sequelize.STRING,
    },
    etat:{
        type: Sequelize.STRING,
    },
    ZoneId:{
        type: Sequelize.STRING,
    },
    RestaurantId:{
        type: Sequelize.STRING,
    },
    SalleId:{
        type: Sequelize.STRING,
    },
    Guestname:{
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
     
});

return SelectTableResv;
}