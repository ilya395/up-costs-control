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
      // type: Sequelize.INTEGER,
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      // get() {
      //   return this.setDataValue("status") === 1 ? true : false
      // },
      // set(value) {
      //   this.setDataValue("status", value ? 1 : 0)
      // }
    }
  },
  {
    sequelize: connect,
    modelName: 'support_messages',
    timestamps: true
  }
);

module.exports = SupportMessageModel;