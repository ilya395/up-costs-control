const express = require("express");
const costsController = require("../controllers/costs.controller");

const costsRoutes = express.Router();

costsRoutes
  .route("/get")
  .post(costsController.getCost)

costsRoutes
  .route("/set")
  .put(costsController.setCost)

costsRoutes
  .route("/delete")
  .delete(costsController.deleteCost)

costsRoutes
  .route("/update")
  .put(costsController.updateCost)

module.exports = costsRoutes;