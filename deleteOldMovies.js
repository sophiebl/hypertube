const { sequelize } = require("./server/models/index");
const { Op } = require('sequelize')
const DownloadedMovie = sequelize.import("./server/models/downloadedmovie");
const rimraf = require("rimraf");

const deleteOldMovies = async () => {
  const oneMonthAgo = new Date(new Date().setDate(new Date().getDate() - 30));

  const moviesToDelete = await DownloadedMovie.findAll({
    where: {
      lastWatched: {
        [Op.lte]: oneMonthAgo,
      },
    },
  });
  moviesToDelete.forEach((movie) => {
    const path = movie.dataValues.path;
    try {
      rimraf(path, () => console.log(`file ${path} is removed`));
    } catch (err) {
    }
  });
  const idsToDelete = moviesToDelete.map(movie => movie.dataValues.id)
  DownloadedMovie.destroy({where: {id : idsToDelete}})
}

module.exports = deleteOldMovies;
