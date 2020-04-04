// import User from '../controllers/user_controller';
const { sequelize } = require("../models/index");
const User = sequelize.import("../models/user");
const jwtSecret = require("../config/jwtConfig");
const jwt = require("jsonwebtoken");
const passport = require("passport");

module.exports = app => {
  app.get("/auth/fortytwo", passport.authenticate("fortyTwo"));
  app.get(
    "/auth/fortytwo/callback",
    passport.authenticate("fortyTwo", {
      failureRedirect: "http://localhost:3000/?message=oauth_fail"
    }),
    async (req, res) => {
      const id = req.user.dataValues.id;
      const token = jwt.sign({ id }, jwtSecret.secret);
      res.redirect("http://localhost:3000?accessToken=" + token);
    }
  );
}