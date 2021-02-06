const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Transfer = sequelize.define('Transfer', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    athlete_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    manager_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    newClub: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    transferDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    commission: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isLoan: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    contractStartDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    contractEndDate: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

module.exports = Transfer;

