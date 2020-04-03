const express = require("express");
const passport = require("passport");
// const userController = require("../controllers/user_controller");

const userRouter = express.Router();
require("./loginUser")(userRouter); // /api/users/login
require("./registerUser")(userRouter); // /api/users/register
require("./findUser")(userRouter); // /api/users/:username
require("./facebook")(userRouter); // /api/users/auth/facebook
require("./fortytwo")(userRouter); // /api/users/auth/fortyTwo
require("./checkToken")(userRouter); // /api/users/checkToken
require("./updateUser")(userRouter); // PUT /api/users

module.exports = userRouter;
