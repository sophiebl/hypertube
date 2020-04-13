const express = require("express");
const passport = require("passport");
// const userController = require("../controllers/user_controller");

const playerRouter = express.Router();
require("./subtitles")(playerRouter); // /api/users/login


module.exports = playerRouter;
