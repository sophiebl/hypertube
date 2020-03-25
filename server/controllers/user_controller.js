const passport = require("passport");
const dotenv = require("dotenv");
const strategy = require("passport-facebook");

const userModel = require("../models/user");

const FacebookStrategy = strategy.Strategy;

dotenv.config();
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });
