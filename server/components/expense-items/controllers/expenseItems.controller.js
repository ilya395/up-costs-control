const ExpenseItemsModel = require("../models/expenseItems.model");

class ExpenseItemController {
  getExpenseItem(req, res) {
    return res.status(200).json({
      status: "OK"
    });
  }
  setExpenseItem(req, res) {
    return res.status(200).json({
      status: "OK"
    });
  }
  deleteExpenseItem(req, res) {
    return res.status(200).json({
      status: "OK"
    });
  }
  updateExpenseItem(req, res) {
    return res.status(200).json({
      status: "OK"
    });
  }
}

module.exports = new ExpenseItemController();