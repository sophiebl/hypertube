module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "fortytwo_id", Sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Users",
      "fortytwo_id",
      Sequelize.STRING
    );
  }
};