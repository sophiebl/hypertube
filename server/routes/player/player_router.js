const express = require("express");
const passport = require("passport");

const playerRouter = express.Router();
require("./subtitles")(playerRouter);
require("./player")(playerRouter); 


module.exports = playerRouter;
