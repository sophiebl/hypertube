const express = require("express");
// const userController = require("../controllers/user_controller");

const router = express.Router();
require("./fetchTrending")(router); // GET /api/users/fetchTMDPApi

module.exports = router;
