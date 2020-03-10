'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    author: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    movie: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User);
  };
  return Comment;
};