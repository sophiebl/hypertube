const passport = require("passport");
const { sequelize } = require("../models/index");
const _ = require('lodash')
const User = sequelize.import("../models/user");

const deleteUser = (req, res) => {
  const userId = req.user.id
  User.destroy({
    where: {
      id: userId
    }
  }).then(
    res.send({deleted: true})
  );
}
module.exports = app => {
  app.delete("/", passport.authenticate("jwt", { session: false }), deleteUser);
};