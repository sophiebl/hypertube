// import User from '../controllers/user_controller';
const { sequelize } = require("../models/index");
const User = sequelize.import("../models/user");
const jwtSecret = require("../config/jwtConfig");
const jwt = require("jsonwebtoken");
const passport = require("passport");

module.exports = (app) => {
  app.get("/login", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        res.send({
          auth: false,
          message: info.message,
        });
      } else {
        req.logIn(user, (err) => {
          User.findOne({
            where: {
              userName: user.userName,
            },
          }).then((user) => {
            const token = jwt.sign({ id: user.id }, jwtSecret.secret);
            res.status(200).send({
              auth: true,
              token: token,
              message: "user found & logged in",
            });
          });
        });
      }
    })(req, res, next);
  });
};
