const { Op } = require('sequelize');
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

      try {
        console.log("get collection: ", date)
        const now = new Date(+date);
        const thisDate = new Date(now.getFullYear(), now.getMonth(), 1);
        const nextDate = new Date(now.getFullYear(), now.getMonth() + 1, -1);
        console.log("stypid dates: ", thisDate, nextDate, now.getFullYear(), now.getMonth());
        const expenseItems = await expenseItemsModel
          .findAll({
            where: {
              userId
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
        // console.log(costs)
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
          data
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