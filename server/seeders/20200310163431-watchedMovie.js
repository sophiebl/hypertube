'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      `SELECT id from "Users";`
    );
    return queryInterface.bulkInsert('WatchedMovies', [{
      user: users[0][0].id,
      alreadyWatched: 10,
      movie: 'tt1375666',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      user: users[0][1].id,
      alreadyWatched: 65,
      movie: 'tt3480822',
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WatchedMovies', null, {});
  }
};
