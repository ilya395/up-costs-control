const expenseItemsRoutes = require("./routes/expenseItems.route");
const ExpenseItemsModel = require("./models/expenseItems.model");
const expenseItemsController = require("./controllers/expenseItems.controller");

module.exports = {
  expenseItemsRoutes,
  expenseItemsModel: ExpenseItemsModel,
  expenseItemsController
}