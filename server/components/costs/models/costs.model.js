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
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    // createdAt: {
    //   type: Sequelize.DATE,
    //   field: 'created_at',
    // },
    // updatedAt: {
    //   type: Sequelize.DATE,
    //   field: 'updated_at'
    // },
  },
  {
    sequelize: connect,
    modelName: "costs",
    timestamps: true
  }
);

module.exports = CostsModel;