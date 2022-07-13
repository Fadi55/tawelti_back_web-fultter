module.exports = (sequelize, Sequelize) => {
    const PicturePrincip = sequelize.define('PicturePrincip', {
        name:{
            type: Sequelize.STRING,
        },
        data:{
            type: Sequelize.STRING,
        },
        RestaurantId:{
            type: Sequelize.INTEGER,
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


    return PicturePrincip;
}