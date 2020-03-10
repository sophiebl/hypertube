'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('DownloadedMovies', [{
      lastWatched: new Date(),
      path:'abc',
      movie: 'tt1375666',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      lastWatched: new Date(),
      path:'abc',
      movie: 'tt0120338',
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DownloadedMovies', null, {});
  }
};
