const { sequelize } = require("../models/index");
const User = sequelize.import("../models/user");
const jwt = require("jwt-simple");
const { checkJwtFormat, tokenErrorMessage } = require("./utils");

module.exports = (app) => {
  app.get("/resetPasswordValidation/:token", (req, res, next) => {
    const token = req.params.token;
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
            tokenErrorMessage(res);
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
    } else {
      tokenErrorMessage(res);
    }
  });
};
