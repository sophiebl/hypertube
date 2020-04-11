const { sequelize } = require("../models/index");
const User = sequelize.import("../models/user");
const jwt = require("jwt-simple");

module.exports = (app) => {
  app.get("/resetPasswordValidation/:token", (req, res, next) => {
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
            resetAccepted: false,
            message:
              "We were unable to find a user for this token. Please sign up again 🙏",
          });
        } else {
          res.status(200).send({
            resetAccepted: true,
            email: user.email,
            message: "Please enter your new password twice 🔑",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
};
