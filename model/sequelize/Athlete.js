const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Athlete = sequelize.define('Athlete', {
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
    birthDate: {
        type: Sequelize.DATE,
        allowNull: true,
        unique: false
    },
    currentClub: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

module.exports = Athlete;

