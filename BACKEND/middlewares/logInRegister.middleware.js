/* eslint-disable */
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config').jwtOptions;
const User = require('../config/db.config').users;
const Bill = require('../config/db.config').bills;
const getRandomInt = require('../helpers/helpersfunction.helper').getRandomInt;
const getCurrentDate = require('../helpers/helpersfunction.helper').getCurrentDate;

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

          let expiresDate = getCurrentDate();
          console.log(expiresDate);
          expiresDate.setHours(expiresDate.getHours() + 1);

          req.loginInfo = {
            auth: true,
            token: token,
            uId: user.id,
            email: user.email,
            expiresIn: parseInt(jwtConfig.expiresTime)*60*60*1000, //ms
            message: 'user found & logged in',
          };
          next();
        });
      });
    }
  })(req, res, next);
};

exports.registerMiddleware = (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
    if (err) {
      console.log(err);
      res.status(401).json({ success: false, error: err });
    }
    if (info != undefined) {
      console.log(info.message);
      res.status(422).json({ success: false, error: info.message });
    } else {
      req.logIn(user, err => {
        const data = {
          email: req.body.email,
          login: user.login,
          name:req.body.name,
          surname:req.body.surname
        };
        User.findOne({
          where: {
            login: data.login,
          },
        }).then(user => {
          user
            .update({
              email: data.email,
              login: data.login,
              name:data.name,
              surname:data.surname
            })
            .then(() => {
              req.data = data;

              Bill.create({
                id_owner: user.id,
                available_funds: 10,
                account_bill: getRandomInt(10000000000000000000000000, 99999999999999999999999999),
              });
              console.log('user created in db');

              next();


            });
        });
      });
    }
  })(req, res, next);
};
