const usersModel = require("./models/users.model");
const usersRoutes = require("./routes/users.route");
const usersController = require("./controllers/users.controller");

module.exports = {
  usersModel,
  usersRoutes,
  usersController
}