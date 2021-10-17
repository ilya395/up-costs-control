const CostsModel = require("./models/costs.model");
const costsRoutes = require("./routes/costs.route");
const costsController = require("./controllers/costs.controller");

module.exports = {
  costsModel: CostsModel,
  costsRoutes,
  costsController
}