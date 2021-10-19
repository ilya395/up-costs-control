const express = require("express");
const { usersRoutes, expenseItemsRoutes, costsRoutes, authRoutes } = require("../components/index");

const apiRoutes = express.Router();

apiRoutes
  .use("/costs", costsRoutes)
  .use("/expenseItems", expenseItemsRoutes)
  .use("/users", usersRoutes)
  .use("/auth", authRoutes)

module.exports = apiRoutes;