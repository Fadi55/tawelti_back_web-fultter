/*module.exports = (sequelize, Sequelize) => {
    const Restaurant = sequelize.define('Restaurant', {
 
        
 

 
            NomResto:{
        type: Sequelize.STRING,
    },
    Description:{
        type: Sequelize.STRING,
    },
    adresse:{
        type: Sequelize.STRING,
    },
    NBzone:{
        type: Sequelize.STRING,
    },
    etat:{
        type: Sequelize.INTEGER,
    },
    temps_ouverture:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    temps_fermeture:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
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

return Restaurant;
}*/

module.exports = (sequelize, Sequelize) => {
    const Restaurant = sequelize.define('Restaurant', {

        NomResto: {
            type: Sequelize.STRING,
        },
        Description: {
            type: Sequelize.STRING,
        },
        adresse: {
            type: Sequelize.STRING,
        },
        etat: {
            type: Sequelize.INTEGER,
        },
        budget: {
            type: Sequelize.INTEGER,
        },
        temps_ouverture: {
            type: Sequelize.STRING,
         
        },
        temps_fermeture: {
            type: Sequelize.STRING,
            
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        UserId: {
            type: Sequelize.INTEGER
        }

    });

    return Restaurant;
}