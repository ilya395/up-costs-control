const express = require("express");
const expenseItemsController = require("../controllers/expenseItems.controller");

const expenseItemsRoutes = express.Router();

expenseItemsRoutes
  .route("/get")
  .post(expenseItemsController.getExpenseItem)

expenseItemsRoutes
  .route("/set")
  .put(expenseItemsController.setExpenseItem)

expenseItemsRoutes
  .route("/update")
  .post(expenseItemsController.updateExpenseItem)

expenseItemsRoutes
  .route("/delete")
  .delete(expenseItemsController.deleteExpenseItem)

module.exports = expenseItemsRoutes;