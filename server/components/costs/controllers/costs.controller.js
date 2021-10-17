class CostsController {
  getCost(req, res) {
    return res.status(200).json({
      status: "OK"
    });
  }
  setCost(req, res) {
    return res.status(200).json({
      status: "OK"
    });
  }
  deleteCost(req, res) {
    return res.status(200).json({
      status: "OK"
    });
  }
  updateCost(req, res) {
    return res.status(200).json({
      status: "OK"
    });
  }
}

module.exports = new CostsController();