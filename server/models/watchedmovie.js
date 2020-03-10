'use strict';
module.exports = (sequelize, DataTypes) => {
  const WatchedMovie = sequelize.define('WatchedMovie', {
    user: DataTypes.INTEGER,
    alreadyWatched: DataTypes.INTEGER,
    movie: DataTypes.STRING
  }, {});
  WatchedMovie.associate = function(models) {
    WatchedMovie.belongsTo(models.User);
  };
  return WatchedMovie;
};