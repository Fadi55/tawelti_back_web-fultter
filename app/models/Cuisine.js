module.exports = (sequelize, Sequelize) => {
    const Cuisine = sequelize.define('Cuisine', {

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

    return Cuisine;
}