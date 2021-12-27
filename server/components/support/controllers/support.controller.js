const { checkCostValidate } = require("../../../validate");
const supportMessageModel = require("../models/support.model");

class SupportMessageController {
  async setSupportMessages(req, res) {
    if (req.user) {
      if(!req.body) {
        return res.status(400).json({
          message: "Something wrong",
          status: "ERROR"
        });
      }
      const { userId, problem } = req.body;
      // нужно проверить входные данные
      if (
        !checkCostValidate({
          keys: ["problem", "userId"],
          data: {problem, userId},
        })
      ) {
        return res.status(400).json({
          message: "Wrong data",
          status: "ERROR"
        });
      }
      try {
        const mes = await supportMessageModel
          .create({
            userId,
            problem,
          })
          .catch(e => {
            return res.status(400).json({
              status: "ERROR",
              message: "Can not create support message with model",
              error: e
            });
          })
        return res.status(200).json({
          status: "OK",
          mes
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
}

module.exports = new SupportMessageController();