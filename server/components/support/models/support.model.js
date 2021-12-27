const Sequelize = require("sequelize");
const connect = require("../../../connectors/sequelize.conector");
const UsersModel = require("../../users/models/users.model");

class SupportMessageModel extends Sequelize.Model {}

SupportMessageModel.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    problem: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    sequelize: connect,
    modelName: 'support_messages',
    timestamps: true
  }
);
// SupportMessageModel.hasMany(UsersModel, { onDelete: "cascade" });

module.exports = SupportMessageModel;