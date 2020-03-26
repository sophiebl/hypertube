const express = require("express");
const passport = require("passport");
// const userController = require("../controllers/user_controller");

const userRouter = express.Router();
require("./loginUser")(userRouter); // /api/users/login
require("./registerUser")(userRouter); // /api/users/register
require("./findUser")(userRouter); // /api/users/find
require("./facebook")(userRouter); // /api/users/auth/facebook
require("./checkToken")(userRouter); // /api/users/checkToken

module.exports = userRouter;
