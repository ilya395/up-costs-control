const express = require("express");

const fs = require( 'fs' );
const path = require( 'path' );

const bodyParser = require('body-parser');

const apiRoutes = require("./routes/index");
const { HOST, PORT, TOKEN_KEY } = require("./constants");
const jwt = require('jsonwebtoken');
const sequelize = require("./connectors/sequelize.conector");
const { usersModel } = require("./components/index");

const app = () => {
  // создаем объект приложения
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // для проверки jwt
  app.use(async (req, res, next) => {
    if (req.headers.authorization) {
      return await jwt.verify(
        req.headers.authorization.split(' ')[1],
        TOKEN_KEY,
        async (err, payload) => {
          if (err) {
            await next()
          }
          else if (payload) {
            const users = await usersModel.findAll({
              where: {
                id: payload.id
              },
              raw: true
            });
            for (let user of users) {
              if (user.id === payload.id) {
                req.user = user
                await next()
              }
            }

            if (!req.user) {
              await next()
            }
          }
        }
      );
    }
    await next();
  });

  app.use('/api', apiRoutes);

  // синхронизация с бд, после успшной синхронизации запускаем сервер
  sequelize.sync().then(()=>{
    app.listen(PORT, () => {
      console.log(`Server listens http://${HOST}:${PORT}`)
    });
  }).catch(err=>console.log(err));
}

module.exports = app;
