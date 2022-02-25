module.exports = (sequelize, Sequelize) => {
    const Favorite = sequelize.define('favorite', {
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

    return Favorite;
}