const { checkCostValidate } = require("../../../validate");
const supportMessageModel = require("../models/support.model");
const emailSendler = require("../../emailSendler");
const { ADMIN_EMAIL } = require("../../../constants");
const supportMessageTemplate = require("../../emailSendler/emailTemplates/templates");

class SupportMessageController {
  async setSupportMessages(req, res) {
    if (req.user) {
      if(!req.body) {
        return res.status(400).json({
          message: "Something wrong",
          status: "ERROR"
        });
      }
      const { userId, problem, email } = req.body;
      // нужно проверить входные данные
      if (
        !checkCostValidate({
          keys: ["problem", "userId", "email"],
          data: {problem, userId, email},
        })
      ) {
        return res.status(400).json({
          message: "Wrong data",
          status: "ERROR"
        });
      }
      try {
        const send = await emailSendler
          .send({
            email: ADMIN_EMAIL,
            subject: "Сообщение в поддержку",
            text: "Сообщение",
            template: supportMessageTemplate({
              problem,
              userEmail: email
            })
          })
          .catch(e => {
            return res.status(400).json({
              status: "ERROR",
              message: "Can not send support message",
              error: e
            });
          });
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
          });
        return res.status(200).json({
          status: "OK",
          message: mes,
          sending: send ? true : false,
        });
      } catch(e) {
        return res.status(400).json({
          status: "ERROR",
          message: "Can not create in db and sending",
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