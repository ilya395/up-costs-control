const Sequelize = require("sequelize");
const connect = require("../../../connectors/sequelize.conector");

class CostsModel extends Sequelize.Model {};

CostsModel.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    amount: {
      type: Sequelize.INTEGER,
    },
    description: {
      type: Sequelize.TEXT,
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at'
    },
  },
  {
    sequelize: connect,
    modelName: "costs"
  }
);

module.exports = CostsModel;