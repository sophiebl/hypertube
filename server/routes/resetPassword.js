const { sequelize } = require("../models/index");
const User = sequelize.import("../models/user");

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
          user.password = newPassword;
          user.save();
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
