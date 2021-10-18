const Sequelize = require("sequelize");
const connect = require("../../../connectors/sequelize.conector");
// Импорт встроенных типов данных
// const { DataTypes } = require('sequelize')
const { costsModel } = require("../../costs/index");


class ExpenseItemsModel extends Sequelize.Model {}

ExpenseItemsModel.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    // user_id: {},
    index: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    // createdAt: {
    //   type: Sequelize.DATE,
    //   field: 'created_at',
    // },
    // updatedAt: {
    //   type: Sequelize.DATE,
    //   field: 'updated_at',
    //   // defaultValue: DataTypes.NOW
    // },
    color: {
      type: Sequelize.STRING,
      allowNull: true,
    }
  },
  {
    sequelize: connect,
    modelName: 'expense-items',
    timestamps: true
  }
);
ExpenseItemsModel.hasMany(costsModel, { onDelete: "cascade" });

module.exports = ExpenseItemsModel;