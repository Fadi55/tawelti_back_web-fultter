module.exports = (sequelize, Sequelize) => {
    const BookWaitSeat = sequelize.define('BookWaitSeat', {

        RestaurantId: {
            type: Sequelize.INTEGER,
        },
        UserId: {
            type: Sequelize.INTEGER,
        },
        ids: {
            type: Sequelize.STRING,
            primaryKey: true
        },

        id: {
            type: Sequelize.INTEGER,
            required: true
        },

        guestName: {
            type: Sequelize.STRING,

        },
        cancResv: {
            type: Sequelize.STRING,

        },
        ClienteId: {
            type: Sequelize.INTEGER,

        },
        IdReservation: {
            type: Sequelize.STRING,

        },
        waitBook: {
            type: Sequelize.STRING,

        },
        confResv: {
            type: Sequelize.STRING,

        },
        random: {
            type: Sequelize.STRING,

        },
        other: {
            type: Sequelize.STRING,

        },
        tableNbrPx: {
            type: Sequelize.INTEGER,
        },
        etat: {
            type: Sequelize.INTEGER,
        },
        block: {
            type: Sequelize.INTEGER,
        },

        debut: {
            type: Sequelize.STRING,

        },
        fin: {
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

    });

    return BookWaitSeat;
}