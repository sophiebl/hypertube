const { sequelize } = require("./server/models/index");
const { Op } = require('sequelize')
const DownloadedMovie = sequelize.import("./server/models/downloadedmovie");
const fs = require("fs");

const deleteOldMovies = async () => {
  const oldDate = new Date(new Date().setDate(new Date().getDate() - 10000));
  const oneMonthAgo = new Date(new Date().setDate(new Date().getDate() - 30));
  console.log({ oldDate, oneMonthAgo });

  const moviesToDelete = await DownloadedMovie.findAll({
    where: {
      lastWatched: {
        [Op.lte]: oneMonthAgo,
      },
    },
  });
  moviesToDelete.forEach(movie => {
    const path = movie.dataValues.path
    try {
      fs.unlinkSync(path);
      console.log(`file ${path} is removed`)
    } catch (err) {
    }
  })
  const idsToDelete = moviesToDelete.map(movie => movie.dataValues.id)
  DownloadedMovie.destroy({where: {id : idsToDelete}})
}

module.exports = deleteOldMovies;
