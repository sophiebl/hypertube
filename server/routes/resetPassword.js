const bcrypt = require("bcrypt");
const { sequelize } = require("../models/index");
const User = sequelize.import("../models/user");
const BCRYPT_SALT_ROUNDS = 12;

module.exports = (app) => {
  app.post("/resetPassword", (req, res, next) => {
    const email = req.body.mail;
    const newPassword = req.body.password1;
    try {
      User.findOne({
        where: {
          email: email,
        },
      }).then((user) => {
        if (!user) {
          res.send({
            resetDone: false,
            message:
              "We were unable to find a user for this token. Please sign up again 🙏",
          });
        } else {
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
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
};
