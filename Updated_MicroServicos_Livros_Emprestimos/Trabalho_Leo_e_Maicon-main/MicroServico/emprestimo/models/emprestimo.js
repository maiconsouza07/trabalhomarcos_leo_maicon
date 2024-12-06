
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Emprestimo = sequelize.define('Emprestimo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  livroId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dataEmprestimo: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  dataDevolucao: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: true,
});

module.exports = Emprestimo;
