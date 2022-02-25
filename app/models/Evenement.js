module.exports = (sequelize, Sequelize) => {
    const Evenement = sequelize.define('evenement', {

        category: {
            type: Sequelize.STRING,
        },
        nom: {
            type: Sequelize.STRING,
        },
        Description: {
            type: Sequelize.STRING,
        },
        RestaurantId: {
            type: Sequelize.INTEGER,
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        heureDebut: {
            type: Sequelize.TIME,
            //defaultValue: Sequelize.NOW,
            //default: 0
        },
        heureFin: {
            type: Sequelize.TIME,
            // defaultValue: Sequelize.NOW,
            //default: 0
        },

        dateDebut: {
            type: Sequelize.DATE,

        },
        dateFin: {
            type: Sequelize.DATE,

        },



    });

    return Evenement;
}