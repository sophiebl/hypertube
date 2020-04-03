const { sequelize } = require("../models/index");
const User = sequelize.import("../models/user");
const passport = require("passport");
const _ = require('lodash')

const checkEmptyFields = inputs => {
  const errors = [];
  
  _.forEach(inputs, (input, inputName) => {
    if (input === '') {
      errors.push(inputName + ' is empty')
    }
  })
  return errors;
}

module.exports = app => {

  app.post('/register', (req, res, next) => {
    const errors = checkEmptyFields(req.body)
    if (errors.length > 0) {
      return res.send({created: false, errors})
    }
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
                console.log('user created in db');
                res.status(200).send({ created: true, message: 'user created' });
              // });
          });
        });
      }
    })(req, res, next);
  });
};