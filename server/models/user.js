module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: {
        type: DataTypes.STRING,
        validate: {
          isAlphanumeric:  {
            msg: "Username must be alphanumeric"
          } 
        }
      },
      firstName: {
        type: DataTypes.STRING,
        validate: {
          is:  {
            args: /^[a-z\s-éèàêïëi]+$/i,
            msg: "Firstname must be just letter with whitespace or hyphen"
          } 
        }
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          is:  {
            args: /^[a-z\s-éèàêïëi]+$/i,
            msg: "Lastname must be just letter with whitespace or hyphen"
          } 
        } 
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: 'Email must be in email format'
          }
        },
      },
      picture: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            msg: 'Picture must be url format'
          }
        }
      }, 
      password: {
        type: DataTypes.TEXT,
      },
      language: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [['EN', 'FR']],
            msg: 'Language should be EN or FR'
          }
        }
      },
      validated: DataTypes.BOOLEAN,
      facebook_id: DataTypes.STRING,
      fortytwo_id: DataTypes.STRING,
      validationToken: DataTypes.STRING,
      resetPasswordToken: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Comment, { as: 'Comments'});
    // User.hasMany(Post, { as: 'posts', foreignKey: 'user_id' });
    User.hasMany(models.WatchedMovie);
  };
  return User;
};
