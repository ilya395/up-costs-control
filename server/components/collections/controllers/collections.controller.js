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

      // try {
        const thisDate = (new Date(+date))//.setHours(0, 0, 0, 0)// .setDate(1); // ??
        console.log(thisDate)
        const nextDate = new Date(thisDate.getFullYear(), thisDate.getMonth(), 32, 0, 0, 0, 0)
        const expenseItems = await expenseItemsModel
          .findAll({
            where: {
              userId
            },
            raw: true,
          })
          .catch(e => {
            console.log(e)
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
                $lte: nextDate,
                // >=
                $gte: thisDate,
              }
            },
            raw: true,
          })
          .catch(e => {
            console.log(e)
            return res.status(400).json({
              status: "ERROR",
              message: "Can not find costs with model",
              error: e
            });
          });
        const data = expenseItems.map(item => {
          return {
            ...item,
            costs: costs.filter(elem => elem.expenseItemId === item.id)
          }
        });
        return res.status(200).json({
          status: "OK",
          data
        });
      // } catch(e) {
      //   return res.status(400).json({
      //     status: "ERROR",
      //     message: "Can not work with models",
      //     error: e
      //   });
      // }
    }
    return res
      .status(401)
      .json({ status: "ERROR", message: "Not authorized" });
  }
}

module.exports = new CostsCollectionController();