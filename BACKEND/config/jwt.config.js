const passportJWT = require('passport-jwt');
const env = require('./env.config');

// ExtractJwt to help extract the token
const { ExtractJwt } = passportJWT;
// JwtStrategy which is the strategy for the authentication
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = env.SECRET_KEY;
jwtOptions.expiresTime = '1h';

exports.JwtStrategy = JwtStrategy;
exports.jwtOptions = jwtOptions;
