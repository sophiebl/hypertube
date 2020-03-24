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
      successRedirect: "/",
      failureRedirect: "/login"
    })
  );
};
