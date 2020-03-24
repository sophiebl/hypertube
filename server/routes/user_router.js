const express = require("express");
const passport = require("passport");
// const userController = require("../controllers/user_controller");

const userRouter = express.Router();
require("./loginUser")(userRouter);
require("./registerUser")(userRouter);
require("./findUser")(userRouter);
require("./facebook")(userRouter);
// userRouter.get("/auth/facebook", passport.authenticate("facebook"));

// userRouter.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: "/",
//     failureRedirect: "/fail"
//   })
// );

// userRouter.get("/fail", (req, res) => {
//   res.send("Failed attempt");
// });

// userRouter.get("/", (req, res) => {
//   res.send("Success");
// });
module.exports = userRouter;
