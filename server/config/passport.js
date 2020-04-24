const jwtSecret = require("./jwtConfig");
const bcrypt = require("bcrypt");

const BCRYPT_SALT_ROUNDS = 12;
const TokenGenerator = require("uuid-token-generator");

const passport = require("passport"),
  localStrategy = require("passport-local").Strategy,
  JWTstrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt,
  FortyTwoStrategy = require("passport-42").Strategy,
  FacebookStrategy = require("passport-facebook").Strategy;
const { sequelize } = require("../models/index");
const User = sequelize.import("../models/user");
const { sendRegisterEmail } = require("../controllers/user_controller");
const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);

passport.serializeUser(function (user, done) {
  done(null, user.dataValues.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id, function (err, user) {
    done(err, user);
  });
});

const checkPwd = (pwd) => {
  if (pwd.length > 5) {
    if (pwd.match(/.*[0-9]+.*/) !== null) {
      if (pwd.match(/.*[A-Z]+.*/) !== null) {
        if (pwd.match(/.*[!@#-_$%^&*\(\){}\[\]:;<,>.?\/\\~`]+.*/) !== null)
          // eslint-disable-line no-useless-escape
          return true;
        else return false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
      passReqToCallback: true,
      failWithError: true,
    },
    (req, username, password, done) => {
      try {
        var check = checkPwd(password);
        if (check) {
          const token = tokgen.generate();
          bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
            User.create({
              userName: username,
              password: hashedPassword,
              firstName: req.body.first_name,
              lastName: req.body.last_name,
              email: req.body.email,
              validationToken: token,
            })
              .then((user) => {
                console.log("user created");
                sendRegisterEmail(user.email, token);
                // note the return needed with passport local - remove this return for passport JWT to work
                return done(null, user, {
                  message: {
                    created: true,
                    message: "User created!",
                  },
                });
              })
              .catch((err) => {
                const errors = err.errors.map((error) => error.message);
                done(null, false, {
                  message: {
                    created: false,
                    message: "il y a une erreur",
                    errors,
                  },
                });
              });
          });
        } else {
          let errors = [
            "Password must be at least 5 characters, contains at least 1 letter, 1 number, 1 Uppercase and 1 special characters.",
          ];
          done(null, false, {
            message: {
              created: false,
              message: "Wrong password",
              errors,
            },
          });
        }
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
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({
          where: {
            userName: username,
          },
        }).then((user) => {
          if (user === null) {
            return done(null, false, { message: "We didn't recognize your username. Are you sure?" });
          } else if (user.dataValues.validated === false) {
            return done(null, false, { message: "Account not validated yet!" });
          } else {
            bcrypt.compare(password, user.password).then((response) => {
              if (response !== true) {
                console.log("passwords do not match");
                return done(null, false, { message: "Passwords do not match" });
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
  jwtFromRequest: ExtractJWT.fromExtractors([ExtractJWT.fromAuthHeaderWithScheme("JWT"), ExtractJWT.fromUrlQueryParameter('token')]),
  secretOrKey: jwtSecret.secret
};

passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      console.log(jwt_payload);
      User.findOne({
        where: {
          id: jwt_payload.id,
        },
      }).then((user) => {
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
      profileFields: ["id", "first_name", "last_name", "picture", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({
        where: { facebook_id: profile.id },
        defaults: {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          picture: profile.photos[0].value,
          facebook_id: profile.id,
          userName:
            profile.name.givenName +
            profile.name.familyName +
            Math.floor(Math.random() * 100),
        },
      }).then(([user, created]) => {
        // if (err) {
        //   return done(err);
        // }
        done(null, user, { message: user.dataValues.id });
      });
    }
  )
);

passport.use(
  "fortyTwo",
  new FortyTwoStrategy(
    {
      clientID: process.env.FORTYTWO_APP_ID,
      clientSecret: process.env.FORTYTWO_APP_SECRET,
      callbackURL: process.env.FORTYTWO_CALLBACK_URL,
    },

    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({
        where: { fortytwo_id: profile.id },
        defaults: {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          picture: profile.photos[0].value,
          userName: profile.username + Math.floor(Math.random() * 100),
          fortytwo_id: profile.id,
        },
      }).then(([user, created]) => {
        // if (err) {
        //   return done(err);
        // }
        done(null, user, { message: user.dataValues.id });
      });
    }
  )
);
