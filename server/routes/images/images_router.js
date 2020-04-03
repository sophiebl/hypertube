const express = require("express");
const passport = require("passport");
// const userController = require("../controllers/user_controller");

const router = express.Router();
require("./uploadImage")(router); // /api/users/login


module.exports = router;
