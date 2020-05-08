const express = require("express");

const router = express.Router();
require("./find")(router); // /api/users/login
require("./findWatchedByUser")(router); // /api/users/login

module.exports = router;
