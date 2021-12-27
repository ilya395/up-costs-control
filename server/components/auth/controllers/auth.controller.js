const hash = require("../../../utils/index");
const jwt = require("jsonwebtoken");
const { TOKEN_KEY, TOKEN_LIFE_TIME } = require("../../../constants/index");
const { checkName, checkPassword } = require("../../../validate/index");
const { usersModel } = require("../../users/index");

class AuthController {
  async getAuth(req, res) {
    if(!req.body) return res.sendStatus(400).json({
      message: "Something wrong",
      status: "ERROR"
    });

    try {
      const { login, password } = req.body;

      if (
        checkName(login) &&
        checkPassword(password)
      ) {
        const user = await usersModel
          .findAll({
            where: {
              login,
              password: hash(password)
            },
            raw: true,
          })
          .catch(e => {
            return res.status(400).json({
              status: "ERROR",
              message: "Can not search with model",
              error: e
            });
          });

        if (user.length > 0) {
          const userData = user[0];
          return res.status(200).json({
            id: userData.id,
            login: userData.login,
            token: jwt.sign(
              { id: userData.id },
              TOKEN_KEY,
              { expiresIn: TOKEN_LIFE_TIME } // in seconds
            ),
          })
        }
      } else {
        return res.status(400).json({ message: 'Bad auth data' })
      }
      return res.status(404).json({ message: 'User not found' })
    } catch(e) {
      return res.status(400).json({
        status: "ERROR",
        message: "Can not search in db",
        error: e
      });
    }
  }
}

module.exports = new AuthController();