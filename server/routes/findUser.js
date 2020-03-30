const passport = require("passport");

const findUser = (req, res) => {
  res.status(200).send({
    auth: true,
    first_name: req.user.firstName,
    last_name: req.user.lastName,
    email: req.user.email,
    username: req.user.userName,
    picture: req.user.picture,
    language: req.user.language,
    message: "user found in db"
  });
};

module.exports = app => {
  app.get("/find", passport.authenticate("jwt", { session: false }), findUser);
};
