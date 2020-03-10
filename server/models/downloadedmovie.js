'use strict';
module.exports = (sequelize, DataTypes) => {
  const DownloadedMovie = sequelize.define('DownloadedMovie', {
    lastWatched: DataTypes.DATE,
    path: DataTypes.TEXT,
    movie: DataTypes.STRING
  }, {});
  DownloadedMovie.associate = function(models) {
    // associations can be defined here
  };
  return DownloadedMovie;
};