const express = require("express");
// const { authRoutes } = require("../components/login");
const { usersRoutes, expenseItemsRoutes, costsRoutes } = require("../components/index");

const apiRoutes = express.Router();

apiRoutes
  .use("/costs", costsRoutes)
  .use("/expenseItems", expenseItemsRoutes)
  .use("/users", usersRoutes)
  // .use("/auth", authRoutes)

module.exports = apiRoutes;