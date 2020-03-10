'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      userName: 'sboulaao',
      firstName: 'sophie',
      lastName: 'boulaaouli',
      email: 'sophieboulaaouli@gmail.com',
      picture: 'abc',
      password: 'test123',
      language: 'EN',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      userName: 'ypetitje',
      firstName: 'Yann',
      lastName: 'Petit Jean',
      email: 'yannpetitjean@gmail.com',
      picture: 'popoo',
      password: 'test123',
      language: 'EN',
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
