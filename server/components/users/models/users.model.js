const Sequelize = require('sequelize');
const connect = require("../../../connectors/sequelize.conector");
const { expenseItemsModel } = require("../../expense-items/index");
const { costsModel } = require("../../costs/index");
const { supportMessageModel } = require('../../support');

class UsersModel extends Sequelize.Model {}

UsersModel.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    shortName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    surname: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: connect,
    modelName: 'users',
    timestamps: true
  }
);
UsersModel.hasMany(expenseItemsModel, { onDelete: "cascade" });
UsersModel.hasMany(costsModel, { onDelete: "cascade" });
UsersModel.hasMany(supportMessageModel, { onDelete: "cascade" });

module.exports = UsersModel;