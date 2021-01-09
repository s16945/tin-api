const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Manager = sequelize.define('Manager', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    phoneNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    careerStartDate: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false
    }
});

module.exports = Manager;

