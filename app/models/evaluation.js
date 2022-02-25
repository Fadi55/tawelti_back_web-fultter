module.exports = (sequelize, Sequelize) => {
    const Evaluation = sequelize.define('evaluation', {
    note_service: {
            type: Sequelize.INTEGER
        },
        note_prix: {
            type: Sequelize.INTEGER
        },
        note_food: {
            type: Sequelize.INTEGER
        },
        note_ambiance: {
            type: Sequelize.INTEGER
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

    return Evaluation;
}