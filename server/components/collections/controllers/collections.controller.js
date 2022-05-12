const { Op } = require('sequelize');
const { checkCollectionValidate } = require('../../../validate');
const costsModel = require("../../costs/models/costs.model");
const expenseItemsModel = require("../../expense-items/models/expenseItems.model");

class CostsCollectionController {
  async getMonthlyExpenses(req, res) {
    if (req.user) {
      if(!req.body) {
        return res.status(400).json({
          message: "Something wrong",
          status: "ERROR"
        });
      }
      const { date, userId } = req.body;

      // нужно проверить входные данные
      if (
        !checkCollectionValidate({
          keys: ["date", "userId"],
          data: {date, userId},
        })
      ) {
        return res.status(400).json({
          message: "Wrong data",
          status: "ERROR"
        });
      }
      try {
        const now = new Date(+date);
        const thisDate = new Date(now.getFullYear(), now.getMonth(), 1, 23, 59, 59);
        const nextDate = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0);
        const expenseItems = await expenseItemsModel
          .findAll({
            where: {
              userId,
            },
            raw: true,
          })
          .catch(e => {
            return res.status(400).json({
              status: "ERROR",
              message: "Can not find expense items with model",
              error: e
            });
          });
        const costs = await costsModel
          .findAll({
            where: {
              userId,
              createdAt: {
                // <=
                [Op.lte]: nextDate,
                // >=
                [Op.gte]: thisDate,
              }
            },
            raw: true,
          })
          .catch(e => {
            return res.status(400).json({
              status: "ERROR",
              message: "Can not find costs with model",
              error: e
            });
          });
        const data = expenseItems.map(item => {
          return {
            ...item,
            costs: costs.filter(elem => +elem.expenseItemId === +item.id),
            costsAmount: costs.filter(elem => +elem.expenseItemId === +item.id).reduce((previousValue, item, index, array) => {
              return previousValue + item.amount
            }, 0),
          }
        });
        return res.status(200).json({
          status: "OK",
          data,
        });
      } catch(e) {
        return res.status(400).json({
          status: "ERROR",
          message: "Can not work with models",
          error: e,
        });
      }
    }
    return res
      .status(401)
      .json({ status: "ERROR", message: "Not authorized" });
  }
  async getMonthlyCosts(req, res) {
    if (req.user) {
      if(!req.body) {
        return res.status(400).json({
          message: "Something wrong",
          status: "ERROR"
        });
      }
      const { date, userId, expenseItemId } = req.body;

      // нужно проверить входные данные
      if (
        !checkCollectionValidate({
          keys: ["date", "userId", "expenseItemId"],
          data: {date, userId, expenseItemId},
        })
      ) {
        return res.status(400).json({
          message: "Wrong data",
          status: "ERROR"
        });
      }
      try {
        const now = new Date(+date);
        const thisDate = new Date(now.getFullYear(), now.getMonth(), 1, 23, 59, 59);
        const nextDate = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0);
        const expenseItems = await expenseItemsModel
          .findAll({
            where: {
              userId,
              id: expenseItemId,
            },
            raw: true,
          })
          .catch(e => {
            return res.status(400).json({
              status: "ERROR",
              message: "Can not find expense items with model",
              error: e
            });
          });
        const costs = await costsModel
          .findAll({
            where: {
              userId,
              expenseItemId,
              createdAt: {
                // <=
                [Op.lte]: nextDate,
                // >=
                [Op.gte]: thisDate,
              }
            },
            raw: true,
          })
          .catch(e => {
            return res.status(400).json({
              status: "ERROR",
              message: "Can not find monthly costs with model",
              error: e
            });
          });
        // const data = expenseItems.map(item => {
        //   return {
        //     ...item,
        //     costs: costs.filter(elem => +elem.expenseItemId === +item.id),
        //     costsAmount: costs.filter(elem => +elem.expenseItemId === +item.id).reduce((previousValue, item, index, array) => {
        //       return previousValue + item.amount
        //     }, 0),
        //   }
        // });
        return res.status(200).json({
          status: "OK",
          data: {
            costs,
            expenseItem: expenseItems[0],
          },
        });
      } catch(e) {
        return res.status(400).json({
          status: "ERROR",
          message: "Can not work with models",
          error: e,
        });
      }
    }
    return res
      .status(401)
      .json({ status: "ERROR", message: "Not authorized" });
  }
}

module.exports = new CostsCollectionController();