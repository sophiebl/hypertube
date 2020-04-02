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
      failureRedirect: "http://localhost:3000/?message=oauth_fail"
    }),
    async (req, res) => {
      const userName = req.user.dataValues.userName;
      const token = jwt.sign({ id: userName }, jwtSecret.secret);
      res.redirect("http://localhost:3000?accessToken=" + token);
    }
  );
};