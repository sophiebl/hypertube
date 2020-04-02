
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('WatchedMovies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      alreadyWatched: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      movie: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('WatchedMovies');
  }
};