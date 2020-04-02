module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      firstName: {
        type: DataTypes.STRING,
        isAlpha: true
      },
      lastName: {
        type: DataTypes.STRING,
        isAlpha: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        // validate: {
          // msg: 'Email address already in use!'
        // },
        // validate: {
        //   args: {
        //     isEmail: true,
        //     unique: true
        //   },
        //   msg: 'Email address already in use!'
        // }
      },
      picture: DataTypes.STRING,
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {notEmpty: true, min: 6}
        // validate: {
        //   len: { args: [8, Infinity], msg: "Password must be at least 8 characters." },
        //   not: { args: [/\s+/ig], msg: "Password must not have blank spaces." }
        // }
      },
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
