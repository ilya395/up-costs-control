const express = require("express");
const costsCollection = require("../controllers/collections.controller");

const costsCollectionRoutes = express.Router();

costsCollectionRoutes
  .route("/costs")
  .post(costsCollection.getMonthlyExpenses)

module.exports = costsCollectionRoutes;