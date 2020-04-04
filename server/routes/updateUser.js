const passport = require("passport");
const { sequelize } = require("../models/index");
const _ = require('lodash')
const User = sequelize.import("../models/user");

const updateUser = async (req, res) => {
  const userId = req.user.id
  const inputs = filterInputs(req.body)

  const errors = await verifyInputs(inputs)

  if (_.isEmpty(errors)) {
    User.update(inputs, {
      where: { id: userId }
    }).then(updatedRows => res.send({ 
      success: true, 
      message: 'User successfully updated!'
    })).catch(err => {
      const errors = err.errors.map(error => error.message);
      res.send({ success: false, errors})
    });
  } else {
    res.send({ success: false, errors})
  }
};

const filterInputs = inputs => {
  const authorized_inputs = [
    "firstName",
    "lastName",
    "email",
    "userName",
    "picture",
    "language",
  ];
  return Object.keys(inputs)
    .filter(key => authorized_inputs.includes(key))
    .reduce((obj, key) => {
      obj[key] = inputs[key];
      return obj;
    }, {});
}

const verifyInputs = async inputs => {
  const errors = [];
  if (inputs.userName) {
    await User.count({ where: { userName: inputs.userName } }).then(count => {
      if (count) {
        errors.push("This username already exists");
      }
    });
  }
  if (inputs.email) {
    await User.count({ where: { email: inputs.email } }).then(count => {
      if (count) {
        errors.push("This email already exists");
      }
    });
  }
  return errors;
};

module.exports = app => {
  app.put("/", passport.authenticate("jwt", { session: false }), updateUser);
};
