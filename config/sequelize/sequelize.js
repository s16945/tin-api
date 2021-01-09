const Sequelize = require('sequelize');

const sequelize = new Sequelize('fabryka-sportu', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;

