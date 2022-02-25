module.exports = (sequelize, Sequelize) => {
    const Avis = sequelize.define('avis', {
    text: {
            type: Sequelize.STRING
        },
       UserId: {
            type: Sequelize.INTEGER
        },
        RestaurantId: {
            type: Sequelize.INTEGER
        },
        createdAt:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
},
updatedAt:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
}
    });

    return Avis;
}