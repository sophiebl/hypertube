const passport = require("passport");
const { sequelize } = require("../../models/index");
const WatchedMovie = sequelize.import("../../models/watchedmovie");

const findWatchedByUser = async (req, res) => {
  const id = req.user.id;

  const foundMovies = await WatchedMovie.findAll({ where: { user: id } });
  res.send(foundMovies.map((watchedMovie) => watchedMovie.dataValues.movie));
};

module.exports = (app) => {
  app.get(
    "/findwatched",
    passport.authenticate("jwt", { session: false }),
    findWatchedByUser
  );
};
