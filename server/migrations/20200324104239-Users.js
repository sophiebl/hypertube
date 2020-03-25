module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "facebook_id", Sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Users",
      "facebook_id",
      Sequelize.STRING
    );
  }
};
