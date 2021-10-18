const CostsModel = require("../models/costs.model");

class CostsController {
  getCost(req, res) {
    if(!req.body) {
      return res.status(400).json({
        message: "Something wrong",
        status: "ERROR"
      });
    }
    return res.status(200).json({
      status: "OK"
    });
  }
  async setCost(req, res) {
    if(!req.body) {
      return res.status(400).json({
        message: "Something wrong",
        status: "ERROR"
      });
    }
    const { amount, description, userId, expenseItemId } = req.body;
    // нужно проверить входные данные
    try {
      const data = await CostsModel
        .create({
          amount,
          description,
          userId,
          expenseItemId
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
  deleteCost(req, res) {
    if(!req.body) {
      return res.status(400).json({
        message: "Something wrong",
        status: "ERROR"
      });
    }
    return res.status(200).json({
      status: "OK"
    });
  }
  updateCost(req, res) {
    if(!req.body) {
      return res.status(400).json({
        message: "Something wrong",
        status: "ERROR"
      });
    }
    return res.status(200).json({
      status: "OK"
    });
  }
}

module.exports = new CostsController();