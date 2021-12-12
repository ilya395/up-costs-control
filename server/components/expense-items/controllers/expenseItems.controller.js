const { Op } = require('sequelize');
const ExpenseItemsModel = require("../models/expenseItems.model");

class ExpenseItemController {
  async getExpenseItem(req, res) {
    if (req.user) {
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
        const items = await ExpenseItemsModel
          .findAll(searchData)
          .catch(e => {
            console.log(e)
            return res.status(400).json({
              status: "ERROR",
              message: "Can not search with model",
              error: e
            });
          });
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
    return res
      .status(401)
      .json({ status: "ERROR", message: "Not authorized" });
  }
  async setExpenseItem(req, res) {
    if (req.user) {
      if(!req.body) {
        return res.status(400).json({
          message: "Something wrong",
          status: "ERROR"
        });
      }
      const { name, userId, color, } = req.body;
      // нужно проверить входные данные
      try {
        const items = await ExpenseItemsModel
          .findAll({
            where: {
              userId
            },
            raw: true
          })
          .catch(e => {
            console.log(e)
            return res.status(400).json({
              status: "ERROR",
              message: "Can not search expense items with model",
              error: e
            });
          });
        const data = await ExpenseItemsModel
          .create({
            name,
            userId,
            index: items.length + 1,
            color,
          })
          .catch(e => {
            console.log(e)
            return res.status(400).json({
              status: "ERROR",
              message: "Can not create expense items with model",
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
    return res
      .status(401)
      .json({ status: "ERROR", message: "Not authorized" });
  }
  async deleteExpenseItem(req, res) {
    if (req.user) {
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
        if (items) {
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
    return res
      .status(401)
      .json({ status: "ERROR", message: "Not authorized" });
  }
  async updateExpenseItem(req, res) {
    if (req.user) {
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
        console.log(innerData)

        if (innerData && innerData.index) {
          const oldItem = await ExpenseItemsModel
            .findOne({
              where: {
                id: +innerData.id,
                userId: +innerData.userId,
              },
              raw: true,
            })
            .catch(e => {
              console.log(e)
              return res.status(400).json({
                status: "ERROR",
                message: "Can not find this model",
                error: e
              });
            });
          console.log("oldItem: ", oldItem)
          console.log(+oldItem.index - +innerData.index )

          if (+oldItem.index - +innerData.index > 0) { // от большего к меньшему
            const items = await ExpenseItemsModel
              .findAll({
                where: {
                  index: {
                    [Op.gte]: +innerData.index,
                    [Op.lte]: +oldItem.index
                  },
                  userId: +innerData.userId,
                },
                raw: true,
              })
              .catch(e => {
                console.log(e)
                return res.status(400).json({
                  status: "ERROR",
                  message: "Can not find models",
                  error: e
                });
              });
            console.log(items)
            const result = items.map(item => {
              // if (+item.id == +innerData.id) {
              //   item.index += 1;
              //   return item;
              // }
              if (+item.id == +innerData.id) {
                item.index = +innerData.index;
                return item;
              } else {
                item.index += 1;
                return item;
              }
              // if (+item.index > +innerData.index && +item.index < +innerData.index) {
              //   item.index += 1;
              //   return item;
              // }
              // return item;
            });
            console.log(result)
            for (let i = 0; i < result.length; i++) {
              console.log(+result[i].id, +result[i].index)
              const request = await ExpenseItemsModel
                .update(
                  {
                    index: +result[i].index
                  },
                  {
                    where: {
                      id: +result[i].id,
                      userId: +innerData.userId,
                    }
                  }
                )
                .catch(e => {
                  console.log(e)
                  return res.status(400).json({
                    status: "ERROR",
                    message: "Can not update model in queue",
                    error: e
                  });
                });
            }
            return res.status(200).json({
              status: "OK"
            });
          }
          if (+oldItem.index - +innerData.index < 0) { // от меньшего к большему
            const items = await ExpenseItemsModel
              .findAll({
                where: {
                  index: {
                    [Op.gte]: +oldItem.index,
                    [Op.lte]: +innerData.index,
                  },
                  userId: +innerData.userId,
                },
                raw: true,
              })
              .catch(e => {
                console.log(e)
                return res.status(400).json({
                  status: "ERROR",
                  message: "Can not find models",
                  error: e
                });
              });
            const result = items.map(item => {
              if (+item.id == +innerData.id) {
                item.index = +innerData.index;
                return item;
              } else {
                item.index -= 1;
                return item;
              }
              // if (+item.index < +innerData.index && +item.index > +innerData.index) {
              //   item.index -= 1;
              //   return item;
              // }
              // if (+item.id == +innerData.id) {
              //   item.index -= 1;
              //   return item;
              // }
              // return item;
            });
            for (let i = 0; i < result.length; i++) {
              console.log(+result[i].id, +result[i].index)
              const request = await ExpenseItemsModel
                .update(
                  {
                    index: +result[i].index
                  },
                  {
                    where: {
                      id: +result[i].id,
                      userId: +innerData.userId,
                    }
                  }
                )
                .catch(e => {
                  console.log(e)
                  return res.status(400).json({
                    status: "ERROR",
                    message: "Can not update model in queue",
                    error: e
                  });
                });
            }
            return res.status(200).json({
              status: "OK"
            });
          }
        }
        const item = await ExpenseItemsModel
          .update({
              ...innerData,
            }, {
            where: {
              id: +innerData.id,
              userId: +innerData.userId,
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
    return res
      .status(401)
      .json({ status: "ERROR", message: "Not authorized" });
  }
}

module.exports = new ExpenseItemController();