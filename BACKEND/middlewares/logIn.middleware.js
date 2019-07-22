/* eslint-disable */
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config').jwtOptions;
const User = require('../config/db.config').users;

exports.logInMiddleware = (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      console.log(err);
      //TODO: proper status
      res.status(401).json({ success: false, error: err });
    }
    if (info != undefined) {
     // console.log(info.message);
      //TODO: proper status
      res.status(404).json({ success: false, error: info.message });

    } else {
      req.logIn(user, err => {
        User.findOne({
          where: {
            login: user.login,
          },
        }).then(user => {
          const payload = { id: user.id, email: user.email };
          const token = jwt.sign(payload, jwtConfig.secretOrKey, {
            expiresIn: jwtConfig.expiresTime,
          });
          req.loginInfo = {
            auth: true,
            token: token,
            message: 'user found & logged in',
          };
          next();
        });
      });
    }
  })(req, res, next);
};
