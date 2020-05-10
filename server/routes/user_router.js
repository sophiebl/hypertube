const express = require("express");
// const userController = require("../controllers/user_controller");

const userRouter = express.Router();
require("./loginUser")(userRouter); // /api/users/login
require("./registerUser")(userRouter); // /api/users/register
require("./findUser")(userRouter); // /api/users/:username
require("./facebook")(userRouter); // /api/users/auth/facebook
require("./fortytwo")(userRouter); // /api/users/auth/fortyTwo
require("./checkToken")(userRouter); // /api/users/checkToken
require("./updateUser")(userRouter); // PUT /api/users
require("./deleteUser")(userRouter); // DELETE /api/users
require("./validateUser")(userRouter); // GET /api/users/validate/:token
require("./resetPasswordValidation")(userRouter); // GET /api/users/resetPasswordValidation/:token
require("./sendResetEmail")(userRouter); // POST /api/users/resetPassword
require("./resetPassword")(userRouter); // POST /api/users/resetPassword/:email

module.exports = userRouter;
