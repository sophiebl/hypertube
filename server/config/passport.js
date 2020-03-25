const jwtSecret = require("./jwtConfig");
const bcrypt = require("bcrypt");

const BCRYPT_SALT_ROUNDS = 12;

const passport = require("passport"),
  localStrategy = require("passport-local").Strategy,
  JWTstrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt,
  FacebookStrategy = require("passport-facebook").Strategy;

const { sequelize } = require("../models/index");
const User = sequelize.import("../models/user");

passport.serializeUser(function(user, done) {
  // console.log('Datavalues ID', user.dataValues.id);
  done(null, user.dataValues.id);
});

passport.deserializeUser(function(id, done) {
  userModel.findByPk(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false
    },
    (username, password, done) => {
      try {
        User.findOne({
          where: {
            userName: username
          }
        }).then(user => {
          console.log("username   ::::::");
          console.log(username);
          if (user != null) {
            console.log("username already taken");
            return done(null, false, { message: "username already taken" });
          } else {
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
              User.create({
                userName: username,
                password: hashedPassword
              }).then(user => {
                console.log("user created");
                // note the return needed with passport local - remove this return for passport JWT to work
                return done(null, user);
              });
            });
          }
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false
    },
    (username, password, done) => {
      try {
        User.findOne({
          where: {
            userName: username
          }
        }).then(user => {
          if (user === null) {
            return done(null, false, { message: "bad username" });
          } else {
            bcrypt.compare(password, user.password).then(response => {
              if (response !== true) {
                console.log("passwords do not match");
                return done(null, false, { message: "passwords do not match" });
              }
              console.log("user found & authenticated");
              // note the return needed with passport local - remove this return for passport JWT
              return done(null, user);
            });
          }
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: jwtSecret.secret
};

passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          userName: jwt_payload.id
        }
      }).then(user => {
        if (user) {
          console.log("user found in db in passport");
          // note the return removed with passport JWT - add this return for passport local
          done(null, user);
        } else {
          console.log("user not found in db");
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "first_name", "last_name", "picture", "email"]
    },
    function(accessToken, refreshToken, profile, done) {
      // console.log("DATA FACEBOOK AUTH *******");
      // console.log({ accessToken, profile, done, refreshToken });
      User.findOrCreate({
        where: { facebook_id: profile.id },
        defaults: {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          picture: profile.photos[0].value,
          userName: profile.name.givenName + profile.name.familyName
        }
      }).then(([user, created]) => {
        // console.log(user);
        // if (err) {
        //   return done(err);
        // }
        done(null, user);
      });
    }
  )
);
