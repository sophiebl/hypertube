const passport = require("passport");

module.exports = app => {
  app.get("/checkToken", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.send({
          success: false,
          message: info.message
        });
      } else {
        res.status(200).send({
          success: true,
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          username: user.userName,
          picture: user.picture,
          language: user.language,
          message: "user found in db"
        });
      }
    })(req, res, next);
  });
};
