const express = require("express");
const { usersRoutes, expenseItemsRoutes, costsRoutes, authRoutes, costsCollectionRoutes } = require("../components/index");

const apiRoutes = express.Router();

apiRoutes
  .use("/costs", costsRoutes)
  .use("/expenseItems", expenseItemsRoutes)
  .use("/users", usersRoutes)
  .use("/auth", authRoutes)
  .use("/collection", costsCollectionRoutes)

module.exports = apiRoutes;