const UsersModel = require("../models/users.model");
const hash = require("../../../utils/index");
const { checkUserValidate } = require("../../../validate");

class UsersController {
  async getUser(req, res) {
    if (req.user) {
      if(!req.body) {
        return res.status(400).json({
          message: "Something wrong",
          status: "ERROR"
        });
      }
      const data = req.body;
      const { id } = data;
      // нужно проверить входные данные
      if (
        !checkUserValidate({
          keys: ["id"],
          data: {id},
        })
      ) {
        return res.status(400).json({
          message: "Wrong data",
          status: "ERROR"
        });
      }
      const innerData = {};
      for (let key in data) {
        if (data[key]) {
          innerData[key] = data[key];
        }
      }
      try {
        const entries = Object.entries(innerData);
        const searchData = entries.length > 0 ? // зачем это надо?
          {
            where: innerData,
            attributes: ["id", "login", "email", "phone", "shortName", "surname"],
            raw: true
          } : false;
          // {
          //   attributes: ["id", "login", "email", "phone", "shortName", "surname"],
          //   raw: true
          // };
        if (!searchData) {
          return res.status(403).json({ status: "OK", message: 'Not data for searching!' });
        }
        const users = await UsersModel
          .findAll(searchData)
          .catch(e => {
            return res.status(400).json({
              status: "ERROR",
              message: "Can not search with model",
              error: e
            });
          });
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
    return res
      .status(401)
      .json({ status: "ERROR", message: "Not authorized" });
  }
  async setUser(req, res) {
    if (req.user) {
      if(!req.body) {
        return res.status(400).json({
          message: "Something wrong",
          status: "ERROR"
        });
      }
      const { login, password, email, phone, shortName, surname } = req.body;
      // нужно проверить входные данные
      if (
        !checkUserValidate({
          keys: ["login", "password", "email", "phone", "shortName", "surname"],
          data: {login, password, email, phone, shortName, surname},
        })
      ) {
        return res.status(400).json({
          message: "Wrong data",
          status: "ERROR"
        });
      }
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
    return res
      .status(401)
      .json({ status: "ERROR", message: "Not authorized" });
  }
  async deleteUser(req, res) {
    if (req.user) {
      if(!req.body) {
        return res.status(400).json({
          message: "Something wrong",
          status: "ERROR"
        });
      }
      const data = req.body;
      // нужно проверить входные данные
      if (
        !checkUserValidate({
          keys: ["id"],
          data: {id},
        })
      ) {
        return res.status(400).json({
          message: "Wrong data",
          status: "ERROR"
        });
      }
      const innerData = {};
      for (let key in data) {
        if (data[key]) {
          innerData[key] = data[key];
        }
      }
      try {
        const users = await UsersModel
          .destroy({
            where: innerData,
          })
          .catch(e => {
            return res.status(400).json({
              status: "ERROR",
              message: "Can not delete with model",
              error: e
            });
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
    return res
      .status(401)
      .json({ status: "ERROR", message: "Not authorized" });
  }
  async updateUser(req, res) {
    if (req.user) {
      if(!req.body) {
        return res.status(400).json({
          message: "Something wrong",
          status: "ERROR"
        });
      }
      const data = req.body;
      // нужно проверить входные данные
      if (
        !checkUserValidate({
          keys: ["id", "login", "password", "email", "phone", "shortName", "surname"],
          data: {id, login, password, email, phone, shortName, surname},
        })
      ) {
        return res.status(400).json({
          message: "Wrong data",
          status: "ERROR"
        });
      }
      const innerData = {};
      for (let key in data) {
        if (data[key]) { // ?
          if (key === "password") {
            innerData.password = hash(data.password);
          } else {
            innerData[key] = data[key];
          }
        }
      }
      try {
        const entries = Object.entries(innerData);
        if (entries.length < 1) {
          return res.status(400).json({
            status: "ERROR",
            message: "No data for update",
          });
        }
        const user = await UsersModel
          .update({
              ...innerData,
            }, {
            where: {
              id: +innerData.id
            }
          })
          .catch(e => {
            return res.status(400).json({
              status: "ERROR",
              message: "Can not update with model",
              error: e
            });
          });
        if (user[0] > 0) {
          return res.status(200).json({
            data: user,
            status: "OK"
          });
        }
        return res.status(404).json({ status: "OK", message: 'Not users' });
      } catch(e) {
        return res.status(400).json({
          status: "ERROR",
          message: "Can not find and update in db",
          error: e
        });
      }
    }
    return res
      .status(401)
      .json({ status: "ERROR", message: "Not authorized" });
  }
}

module.exports = new UsersController();