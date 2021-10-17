const express = require("express");
const expenseItemsController = require("../controllers/expenseItems.controller");

const expenseItemsRoutes = express.Router();

expenseItemsRoutes
  .route("/get")
  .get(expenseItemsController.getExpenseItem)

expenseItemsRoutes
  .route("/set")
  .put(expenseItemsController.setExpenseItem)

expenseItemsRoutes
  .post("/update")
  .get(expenseItemsController.updateExpenseItem)

expenseItemsRoutes
  .route("/delete")
  .delete(expenseItemsController.deleteExpenseItem)

module.exports = expenseItemsRoutes;