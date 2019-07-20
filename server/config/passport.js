/*eslint-disable */

const passport = require('passport');
const passportJWT = require('passport-jwt');
const { getUser } = require('../helpers/db.helper');
const { JwtStrategy, jwtOptions } = require('./jwt.config');

// lets create our strategy for web token
passport.use(
  new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    const user = getUser({ id: jwt_payload.id });
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  }),
);
