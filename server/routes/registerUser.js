const { sequelize } = require("../models/index");
const User = sequelize.import("../models/user");
const passport = require("passport");

module.exports = app => {
  app.post('/register', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          const data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            username: user.userName,
          };
          User.findOne({
            where: {
              userName: data.username,
            },
          }).then(user => {
            user
              .update({
                firstName: data.first_name,
                lastName: data.last_name,
                email: data.email,
              })
              .then(() => {
                console.log('user created in db');
                res.status(200).send({ message: 'user created' });
              });
          });
        });
      }
    })(req, res, next);
  });
};