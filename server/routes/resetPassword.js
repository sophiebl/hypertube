const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const { sequelize } = require("../models/index");
const User = sequelize.import("../models/user");
const BCRYPT_SALT_ROUNDS = 12;
const checkPwd = require("./../config/passport");
const { checkJwtFormat, tokenErrorMessage } = require("./utils");

module.exports = (app) => {
  app.post("/resetPassword", (req, res, next) => {
    const token = req.body.token;
    const newPassword = req.body.password1;
    if (!checkJwtFormat(token)) {
      tokenErrorMessage(res);
      return;
    }
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    let decodedEmail;
    if (decoded) {
      decodedEmail = decoded.email;
      try {
        User.findOne({
          where: {
            email: decodedEmail,
          },
        }).then((user) => {
          if (!user) {
            res.send({
              resetDone: false,
              message:
                "We were unable to find a user for this token. Please sign up again 🙏",
            });
          } else {
            var check = checkPwd(newPassword);
            if (check) {
              bcrypt
                .hash(newPassword, BCRYPT_SALT_ROUNDS)
                .then((hashedPassword) => {
                  user.password = hashedPassword;
                  user.save();
                });
              res.status(200).send({
                resetDone: true,
                message:
                  "Your password has been updated! You can now login with this new password 🔑",
              });
              return;
            }
            res.send({
              resetDone: false,
              message:
                "Password must be at least 5 characters, contains at least 1 letter, 1 number, 1 Uppercase and 1 special characters.",
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      tokenErrorMessage(res);
    }
  });
};
