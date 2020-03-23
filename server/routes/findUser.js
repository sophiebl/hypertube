const passport = require("passport");

module.exports = app => {
  app.get('/findUser', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        console.log('user found in db from route');
        console.log('user   ::::::');
        console.log(user);
        res.status(200).send({
          auth: true,
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          username: user.userName,
          password: user.password,
          message: 'user found in db',
        });
      }
    })(req, res, next);
  });
};