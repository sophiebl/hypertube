'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      `SELECT id from "Users";`
    );
    return queryInterface.bulkInsert('Comments', [{
      author: users[0][0].id,
      content: 'Ceci est un super commentaire',
      movie: 'tt1375666',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      author: users[0][1].id,
      content: 'Ceci est un deuxieme super commentaire',
      movie: 'tt0120338',
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
