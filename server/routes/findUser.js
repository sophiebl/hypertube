const passport = require("passport");

const findUser = (req, res) => {
  res.status(200).send({
    auth: true,
    first_name: req.user.firstName,
    last_name: req.user.lastName,
    email: req.user.email,
    username: req.user.userName,
    message: "user found in db"
  });
};

module.exports = app => {
  app.get("/find", passport.authenticate("jwt", { session: false }), findUser);
};
