const { checkCostValidate } = require("../../../validate");
const CostsModel = require("../models/costs.model");

class CostsController {
  async getCost(req, res) {
    if (req.user) {
      if(!req.body) {
        return res.status(400).json({
          message: "Something wrong",
          status: "ERROR"
        });
      }
      const data = req.body;
      const { id, amount, description, userId } = data;
      if (
        !checkCostValidate({
          keys: ["id", "amount", "description", "userId"],
          data: {id, amount, description, userId},
        })
      ) {
        return res.status(400).json({
          message: "Wrong data",
          status: "ERROR"
        });
      }
      // нужно проверить входные данные
      const innerData = {};
      for (let key in data) {
        if (data[key] && (["id", "amount", "description", "userId"].indexOf(key) != -1)) {
          innerData[key] = data[key];
        }
      }
      try {
        const entries = Object.entries(innerData);
        const searchData = entries.length > 0 ?
          { where: innerData, raw: true } :
          { raw: true };
        const costs = await CostsModel
          .findAll(searchData)
          .catch(e => {
            return res.status(400).json({
              status: "ERROR",
              message: "Can not search with model",
              error: e
            });
          });
        if (costs.length > 0) {
          return res.status(200).json({
            data: costs,
            status: "OK"
          });
        }
        return res.status(404).json({ status: "OK", message: 'Not costs' });
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
  async setCost(req, res) {
    if (req.user) {
      if(!req.body) {
        return res.status(400).json({
          message: "Something wrong",
          status: "ERROR"
        });
      }
      const { amount, description, userId, expenseItemId, date } = req.body;
      // нужно проверить входные данные
      if (
        !checkCostValidate({
          keys: ["amount", "description", "userId", "expenseItemId", "date"],
          data: {amount, description, userId, expenseItemId, date},
        })
      ) {
        return res.status(400).json({
          message: "Wrong data",
          status: "ERROR"
        });
      }
      try {
        const newData = {
          amount: +amount,
          description,
          userId,
          expenseItemId
        }
        date ? (newData.createdAt = date) : false;
        // date ? (newData.updatedAt = date) : false;
        const data = await CostsModel
          .create(newData)
          .catch(e => {
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
    return res
      .status(401)
      .json({ status: "ERROR", message: "Not authorized" });
  }
  async deleteCost(req, res) {
    if (req.user) {
      if(!req.body) {
        return res.status(400).json({
          message: "Something wrong",
          status: "ERROR"
        });
      }
      const data = req.body;
      // нужно проверить входные данные
      if (
        !checkCostValidate({
          keys: ["id", "userId",],
          data: {id, userId},
        })
      ) {
        return res.status(400).json({
          message: "Wrong data",
          status: "ERROR"
        });
      }
      const innerData = {};
      for (let key in data) {
        if (data[key]) {
          innerData[key] = data[key];
        }
      }
      try {
        const cost = await CostsModel
          .destroy({
            where: innerData,
          })
          .catch(e => {
            return res.status(400).json({
              status: "ERROR",
              message: "Can not delete with model",
              error: e
            });
          });
        if (cost) {
          return res.status(200).json({
            data: cost,
            status: "OK"
          });
        }
        return res.status(404).json({ status: "OK", message: 'Not users' });
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
  async updateCost(req, res) {
    if (req.user) {
      if(!req.body) {
        return res.status(400).json({
          message: "Something wrong",
          status: "ERROR"
        });
      }
      const data = req.body;
      // нужно проверить входные данные
      if (
        !checkCostValidate({
          keys: ["id", "userId", "amount", "description", "expenseItemId", "date"],
          data: {id, userId, amount, description, expenseItemId, date},
        })
      ) {
        return res.status(400).json({
          message: "Wrong data",
          status: "ERROR"
        });
      }
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
        const cost = await CostsModel
          .update({
              ...innerData,
            }, {
            where: {
              id: +innerData.id
            }
          })
          .catch(e => {
            return res.status(400).json({
              status: "ERROR",
              message: "Can not update with model",
              error: e
            });
          });
        if (cost[0] > 0) {
          return res.status(200).json({
            data: cost,
            status: "OK"
          });
        }
        return res.status(404).json({ status: "OK", message: 'Not users' });
      } catch(e) {
        return res.status(400).json({
          status: "ERROR",
          message: "Can not find and update in db",
          error: e
        });
      }
    }
    return res
      .status(401)
      .json({ status: "ERROR", message: "Not authorized" });
  }
}

module.exports = new CostsController();