const { sequelize } = require("../models/index");
const User = sequelize.import("../models/user");
const passport = require("passport");

module.exports = app => {
  app.post('/registerUser', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        console.log("req.body   :::::::");
        console.log(req);
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          const data = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            userName: user.username,
          };
          console.log('data   ::::::::');
          console.log(data);
          User.findOne({
            where: {
              userName: data.userName,
            },
          }).then(user => {
            user
              .update({
                firstName: data.firstName,
                lastName: data.lastName,
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