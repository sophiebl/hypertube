const passport = require("passport");
const _ = require("lodash");

const checkEmptyFields = (inputs) => {
  const errors = [];

  _.forEach(inputs, (input, inputName) => {
    if (input === "") {
      errors.push(inputName + " is empty");
    }
  });
  return errors;
};

module.exports = (app) => {
  app.post("/register", (req, res, next) => {
    const errors = checkEmptyFields(req.body);
    if (errors.length > 0) {
      return res.send({ created: false, errors });
    }
    passport.authenticate("register", (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        res.status(200).send({ created: true, message: "user created" });
      }
    })(req, res, next);
  });
};
