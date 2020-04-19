const express = require("express");
const passport = require("passport");

const playerRouter = express.Router();
require("./subtitles")(playerRouter);
require("./player")(playerRouter);
require("./readSubtitles")(playerRouter); 

module.exports = playerRouter;
