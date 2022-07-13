module.exports = (sequelize, Sequelize) => {
    const General = sequelize.define('General', {
        checked : {
            type: Sequelize.BOOLEAN,
        },
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

    return General;
}