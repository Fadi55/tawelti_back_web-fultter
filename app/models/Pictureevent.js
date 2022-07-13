module.exports = (sequelize, Sequelize) => {
    const Pictureevent = sequelize.define('Pictureevent', {
        name:{
            type: Sequelize.STRING,
        },
        data:{
            type: Sequelize.STRING,
        },
        RestaurantId:{
            type: Sequelize.INTEGER,
        },
        EventId:{
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


    return Pictureevent;
}