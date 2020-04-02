'use strict';
module.exports = (sequelize, DataTypes) => {
  const fortyTwo = sequelize.define('fortyTwo', {
    fortytwo_id: DataTypes.STRING
  }, {});
  fortyTwo.associate = function(models) {
    // associations can be defined here
  };
  return fortyTwo;
};