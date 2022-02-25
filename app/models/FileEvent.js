module.exports = (sequelize, Sequelize) => {
    const FileEvent = sequelize.define('fileEvent', {
        type: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        data: {
            type: Sequelize.BLOB('long')
        },
        EvenementId: {
            type: Sequelize.INTEGER
        },
    });

    return FileEvent;
}