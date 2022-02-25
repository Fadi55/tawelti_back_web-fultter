module.exports = (sequelize, Sequelize) => {
    const Etablissement = sequelize.define('Etablissement', {

        type: {
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
        RestaurantId: {
            type: Sequelize.INTEGER
        }

    });

    return Etablissement;
}