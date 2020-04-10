const { sequelize } = require("../models/index");
const User = sequelize.import("../models/user");
const jwt = require("jwt-simple");

module.exports = (app) => {
  app.get("/validate/:token", (req, res, next) => {
    const token = req.params.token;
    const decoded = jwt.decode(token, process.env.JWT_SECRET).email;
    try {
      User.findOne({
        where: {
          email: decoded,
        },
      }).then((user) => {
        if (!user) {
          res.send({
            validated: false,
            message:
              "We were unable to find a user for this token. Please sign up again 🙏",
          });
        } else if (user.validated === true) {
          res.send({
            validated: false,
            message:
              "This account has already been validated. You can log in! Have fun 🎉",
          });
        } else {
          user.validated = true;
          user.save();
          res.status(200).send({
            validated: true,
            message:
              "The user account is validated, you can now log in! Have fun 🎉",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
};
