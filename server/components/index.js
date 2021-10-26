const { usersModel, usersRoutes, usersController } = require("./users/index");
const { expenseItemsRoutes, expenseItemsModel, expenseItemsController } = require("./expense-items/index");
const { costsModel, costsRoutes, costsController } = require("./costs/index");
const { authController, authRoutes } = require("./auth/index");
const { costsCollectionRoutes, costsCollectionController } = require("./collections/index");

module.exports = {
  usersModel, usersRoutes, usersController,
  expenseItemsRoutes, expenseItemsModel, expenseItemsController,
  costsModel, costsRoutes, costsController,
  authController, authRoutes,
  costsCollectionRoutes, costsCollectionController
}