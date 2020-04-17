const express = require("express");
// const userController = require("../controllers/user_controller");

const router = express.Router();
require("./fetchTMDBApi")(router); // GET /api/users/fetchTMDPApi

module.exports = router;
