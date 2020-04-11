const { sequelize } = require("../models/index");
const User = sequelize.import("../models/user");
const jwt = require("jwt-simple");
const { sendResetEmail } = require("../controllers/user_controller");

module.exports = (app) => {
  app.post("/sendResetEmail", (req, res, next) => {
    const { email } = req.body;
    try {
      User.findOne({
        where: {
          email,
        },
      }).then((user) => {
        if (!user) {
          res.send({
            validEmail: false,
            message:
              "We were unable to find a user for this email address. Please sign up again 🙏",
          });
        } else {
          const payload = {
            email: req.body.email,
          };
          const secret = process.env.JWT_SECRET;
          const token = jwt.encode(payload, secret);
          sendResetEmail(user.email, token);
          res.status(200).send({
            validEmail: true,
            message:
              "The email address is valid, we sent you an email to change your password 💌",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
};
