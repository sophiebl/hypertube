const passport = require("passport");
const { sequelize } = require("../models/index");
const User = sequelize.import("../models/user");

module.exports = (app) => {
  app.get("/validate/:token", (req, res, next) => {
    var token = req.params.token;
    try {
      User.findOne({
        where: {
          validationToken: token,
        },
      }).then((user) => {
        if (!user) {
          res.status(400).send({
            validated: false,
            message: "We were unable to find a user for this token.",
          });
        } else {
          user.validationToken = "";
          user.validated = true;
          user.save();
          res.status(200).send({
            validated: true,
            message: "The user account is validated",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
};
