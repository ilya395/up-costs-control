const express = require("express");
const usersController = require("../controllers/users.controller");

const usersRoutes = express.Router();

usersRoutes
  .route("/get")
  .post(usersController.getUser)

usersRoutes
  .route("/set")
  .put(usersController.setUser)

usersRoutes
  .route("/delete")
  .delete(usersController.deleteUser)

usersRoutes
  .route("/update")
  .post(usersController.updateUser)

module.exports = usersRoutes;