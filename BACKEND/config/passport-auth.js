/* eslint-disable*/

//const jwtSecret = require('./jwtConfig');
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;

const passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  User = require('./db.config').users,
  jwtOptions = require('./jwt.config').jwtOptions;
  JWTstrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt;

  //TODO:change to email register not login
passport.use(
  'register',
  new localStrategy(
    {
      usernameField: 'login',
      passwordField: 'password',
      session: false,
    },
    (login, password, done) => {
      try {
        User.findOne({
          where: {
            login: login,
          },
        }).then(user => {
          if (user != null) {
            //TODO: errors handler response
            console.log('username already taken');
            return done(null, false, { message: 'username already taken' });
          } else {
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
              User.create({ login, password: hashedPassword,date_registration:new Date() }).then(user => {
                console.log('user created');
                // note the return needed with passport local - remove this return for passport JWT to work
                return done(null, user);
              });
            });
          }
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'login',
      passwordField: 'password',
      session: false,
    },
    (login, password, done) => {
      try {
        User.findOne({
          where: {
            login: login,
          },
        }).then(user => {
          if (user === null) {
            return done(null, false, { message: 'bad username' });
          } else {
            bcrypt.compare(password, user.password).then(response => {
              if (response !== true) {

                user.update({ last_failed_logged: new Date() }).then(() => {
                  console.log('succes update');
                });
                return done(null, false, { message: 'passwords do not match' });
              }
              console.log('user found & authenticated');
              user.update({ last_successful_logged: new Date() }).then(() => {
                console.log('succes update');
              });
              // note the return needed with passport local - remove this return for passport JWT
              return done(null, user);
            });
          }
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtOptions.secretOrKey,
};

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          id: jwt_payload.id,
        },
      }).then(user => {
        if (user) {
          console.log('user found in db in passport');
          // note the return removed with passport JWT - add this return for passport local
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  }),
);
