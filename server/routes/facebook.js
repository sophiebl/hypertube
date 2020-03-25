// import User from '../controllers/user_controller';
const { sequelize } = require("../models/index");
const User = sequelize.import("../models/user");
const jwtSecret = require("../config/jwtConfig");
const jwt = require("jsonwebtoken");
const passport = require("passport");

module.exports = app => {
  app.get("/auth/facebook", passport.authenticate("facebook"));
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      // successRedirect: "/api/users/auth/success",
      failureRedirect: "http://localhost:3000/?connected=fail"
    }),
    async (req, res) => {
      const userName = req.user.dataValues.userName;
      const token = jwt.sign({ id: userName }, jwtSecret.secret);
      res.redirect("http://localhost:3000?accessToken=" + token);
      // enlever la fin de la string #_=_ et quand sur la home il y a un accesstoken on enregistre le token et on redirige vers la page d'accueil
    }
  );
};
