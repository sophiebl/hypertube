const { sequelize } = require("../models/index");
const User = sequelize.import("../models/user");
const passport = require("passport");

const findUser = async (req, res) => {
  const id = req.params.id
  
  const foundUser = await User.findOne({ where: { id } });
  if (foundUser) {
    res.status(200).send({
      founded: true,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
      userName: foundUser.userName,
      picture: foundUser.picture,
      language: foundUser.language,
      message: "user found in db"
    });
  } else {
    res.status(200).send({
      founded: false,
      message: "user not found in db"
    });
  }
};

module.exports = app => {
  app.get("/profile/:id", passport.authenticate("jwt", { session: false }), findUser);
};
