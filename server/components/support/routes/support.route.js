const express = require("express");
const supportMessageController = require("../controllers/support.controller");

const supportMessageRoutes = express.Router();

supportMessageRoutes
  .route("/set")
  .put(supportMessageController.setSupportMessages)

module.exports = supportMessageRoutes;