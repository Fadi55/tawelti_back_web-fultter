module.exports = (sequelize, Sequelize) => {
    const Invoice = sequelize.define('Invoice', {

        UserId: {
            type: Sequelize.INTEGER,
        },
        codeInvoice: {
            type: Sequelize.INTEGER,
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });
    return Invoice;
}