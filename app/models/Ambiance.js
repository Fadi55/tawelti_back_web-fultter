module.exports = (sequelize, Sequelize) => {
    const Ambiance = sequelize.define('Ambiance', {

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

    return Ambiance;
}