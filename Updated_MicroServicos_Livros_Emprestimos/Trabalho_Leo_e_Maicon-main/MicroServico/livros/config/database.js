
const { Sequelize } = require('sequelize');

// Configuração do banco de dados SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database_dev.sqlite', // Caminho para o banco SQLite
});

module.exports = sequelize;
