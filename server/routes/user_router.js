const express = require("express");
const passport = require("passport");
// const userController = require("../controllers/user_controller");

const userRouter = express.Router();
require("./loginUser")(userRouter);
require("./registerUser")(userRouter);
require("./findUser")(userRouter);
require("./facebook")(userRouter);
require("./checkToken")(userRouter);

module.exports = userRouter;
