const UsersModel = require("../models/users.model");
const hash = require("../../../utils/index");

class UsersController {
  async getUser(req, res) {
    if(!req.body) {
      return res.status(400).json({
        message: "Something wrong",
        status: "ERROR"
      });
    }
    const data = req.body;
    // нужно проверить входные данные
    const innerData = {};
    for (let key in data) {
      if (data[key]) {
        innerData[key] = data[key];
      }
    }
    try {
      const entries = Object.entries(innerData);
      const searchData = entries.length > 0 ?
        { where: innerData, raw: true } :
        { raw: true };
      const users = await UsersModel.findAll(searchData);
      if (users.length > 0) {
        return res.status(200).json({
          data: users,
          status: "OK"
        });
      }
      return res.status(404).json({ status: "OK", message: 'Not users' });
    } catch(e) {
      return res.status(400).json({
        status: "ERROR",
        message: "Can not find in db",
        error: e
      });
    }
  }
  async setUser(req, res) {
    if(!req.body) {
      return res.status(400).json({
        message: "Something wrong",
        status: "ERROR"
      });
    }
    const { login, password, email, phone, shortName, surname } = req.body;
    // нужно проверить входные данные
    try {
      const data = await UsersModel
        .create({
          login,
          password: hash(password),
          email,
          phone,
          shortName,
          surname
        })
        .catch(e => {
          console.log(e)
          return res.status(400).json({
            status: "ERROR",
            message: "Can not create with model",
            error: e
          });
        })
      return res.status(200).json({
        status: "OK",
        data
      });
    } catch(e) {
      return res.status(400).json({
        status: "ERROR",
        message: "Can not create in db",
        error: e
      });
    }
  }
  async deleteUser(req, res) {
    if(!req.body) {
      return res.status(400).json({
        message: "Something wrong",
        status: "ERROR"
      });
    }
    const data = req.body;
    // нужно проверить входные данные
    const innerData = {};
    for (let key in data) {
      if (data[key]) {
        innerData[key] = data[key];
      }
    }
    try {
      const users = await UsersModel.destroy({
        where: innerData,
      });
      if (users) {
        return res.status(200).json({
          data: users,
          status: "OK"
        });
      }
      return res.status(404).json({ status: "OK", message: 'Not users' });
    } catch(e) {
      return res.status(400).json({
        status: "ERROR",
        message: "Can not find and delete in db",
        error: e
      });
    }
  }
  async updateUser(req, res) {
    if(!req.body) {
      return res.status(400).json({
        message: "Something wrong",
        status: "ERROR"
      });
    }
    const data = req.body;
    // нужно проверить входные данные
    const innerData = {};
    for (let key in data) {
      if (data[key]) { // ?
        innerData[key] = data[key];
      }
    }
    try {
      const user = await UsersModel.update({
        ...innerData,
      }, {
        where: {
          id: +innerData.id
        }
      });
      if (user) {
        return res.status(200).json({
          data: user,
          status: "OK"
        });
      }
      return res.status(404).json({ status: "OK", message: 'Not users' });
    } catch(e) {
      return res.status(400).json({
        status: "ERROR",
        message: "Can not find and delete in db",
        error: e
      });
    }
  }
}

module.exports = new UsersController();