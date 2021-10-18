const ExpenseItemsModel = require("../models/expenseItems.model");

class ExpenseItemController {
  async getExpenseItem(req, res) {
    if(!req.body) {
      return res.status(400).json({
        message: "Something wrong",
        status: "ERROR"
      });
    }
    const data = req.body;
    // нужно проверить входные данные
    const innerData = {};
    for (let key in data) {
      if (data[key]) {
        innerData[key] = data[key];
      }
    }
    try {
      const entries = Object.entries(innerData);
      const searchData = entries.length > 0 ?
        { where: innerData, raw: true } :
        { raw: true };
      const items = await ExpenseItemsModel.findAll(searchData);
      if (items.length > 0) {
        return res.status(200).json({
          data: items,
          status: "OK"
        });
      }
      return res.status(404).json({ status: "OK", message: 'Not expense items' });
    } catch(e) {
      return res.status(400).json({
        status: "ERROR",
        message: "Can not find in db",
        error: e
      });
    }
  }
  async setExpenseItem(req, res) {
    if(!req.body) {
      return res.status(400).json({
        message: "Something wrong",
        status: "ERROR"
      });
    }
    const { name, userId, index, color, } = req.body;
    // нужно проверить входные данные
    try {
      const data = await ExpenseItemsModel
        .create({
          name,
          userId,
          index,
          color,
        })
        .catch(e => {
          console.log(e)
          return res.status(400).json({
            status: "ERROR",
            message: "Can not create with model",
            error: e
          });
        })
      return res.status(200).json({
        status: "OK",
        data
      });
    } catch(e) {
      return res.status(400).json({
        status: "ERROR",
        message: "Can not create in db",
        error: e
      });
    }
  }
  async deleteExpenseItem(req, res) {
    if(!req.body) {
      return res.status(400).json({
        message: "Something wrong",
        status: "ERROR"
      });
    }
    const data = req.body;
    // нужно проверить входные данные
    const innerData = {};
    for (let key in data) {
      if (data[key]) {
        innerData[key] = data[key];
      }
    }
    try {
      const items = await ExpenseItemsModel
        .destroy({
          where: innerData,
        })
        .catch(e => {
          console.log(e)
          return res.status(400).json({
            status: "ERROR",
            message: "Can not delete with model",
            error: e
          });
        });
      if (items[0] > 0) {
        return res.status(200).json({
          data: items,
          status: "OK"
        });
      }
      return res.status(404).json({ status: "OK", message: 'Not expense items' });
    } catch(e) {
      return res.status(400).json({
        status: "ERROR",
        message: "Can not find and delete in db",
        error: e
      });
    }
  }
  async updateExpenseItem(req, res) {
    if(!req.body) {
      return res.status(400).json({
        message: "Something wrong",
        status: "ERROR"
      });
    }
    const data = req.body;
    // нужно проверить входные данные
    const innerData = {};
    for (let key in data) {
      if (data[key]) { // ?
        innerData[key] = data[key];
      }
    }
    try {
      const entries = Object.entries(innerData);
      if (entries.length < 1) {
        return res.status(400).json({
          status: "ERROR",
          message: "No data for update",
        });
      }
      const item = await ExpenseItemsModel
        .update({
            ...innerData,
          }, {
          where: {
            id: +innerData.id
          }
        })
        .catch(e => {
          console.log(e)
          return res.status(400).json({
            status: "ERROR",
            message: "Can not update with model",
            error: e
          });
        });
      if (item[0] > 0) {
        return res.status(200).json({
          data: item,
          status: "OK"
        });
      }
      return res.status(404).json({ status: "OK", message: 'Not expense item' });
    } catch(e) {
      return res.status(400).json({
        status: "ERROR",
        message: "Can not find & update in db",
        error: e
      });
    }
  }
}

module.exports = new ExpenseItemController();