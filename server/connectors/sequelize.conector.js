const Sequelize = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = require('../constants');

module.exports = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    dialect: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: true, // для автозаполнения полей создания и обновления
    }
  }
);