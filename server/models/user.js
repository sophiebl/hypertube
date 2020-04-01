module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      picture: DataTypes.STRING,
      password: DataTypes.TEXT,
      language: DataTypes.STRING,
      validated: DataTypes.BOOLEAN,
      facebook_id: DataTypes.STRING,
      fortytwo_id: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Comment);
    User.hasMany(models.WatchedMovie);
  };
  return User;
};
