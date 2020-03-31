const passport = require("passport");

const findUser = (req, res) => {
  res.status(200).send({
    auth: true,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    userName: req.user.userName,
    picture: req.user.picture,
    language: req.user.language,
    message: "user found in db"
  });
};

module.exports = app => {
  app.get("/find", passport.authenticate("jwt", { session: false }), findUser);
};
