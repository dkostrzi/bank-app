const passportJWT = require('passport-jwt');

// ExtractJwt to help extract the token
const { ExtractJwt } = passportJWT;
// JwtStrategy which is the strategy for the authentication
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'secret'; // TODO: chage to secret from env

exports.JwtStrategy = JwtStrategy;
exports.jwtOptions = jwtOptions;
