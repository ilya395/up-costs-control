const Sequelize = require("sequelize");
const connect = require("../../../connectors/sequelize.conector");

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
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at'
    },
    color: {
      type: Sequelize.STRING,
      allowNull: true,
    }
  },
  {
    sequelize: connect,
    modelName: 'expense-items'
  }
);

module.exports = ExpenseItemsModel;