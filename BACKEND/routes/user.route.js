/* eslint-disable */

const passport = require('passport');
const userController = require('../controllers/user.controller');
const { checkToken } = require('../middlewares/checkToken.middleware');
const auth = require('./auth');
const jwt = require('jsonwebtoken');
const User = require('../config/db.config').users;
const logInMiddleware = require('../middlewares/logIn.middleware').logInMiddleware;

module.exports = app => {
  app.get('/api/users', checkToken, userController.getAllUsers);

  app.get('/api/token',checkToken,userController.getTokenInfo);

  app.get(
    '/api/protected',
    passport.authenticate('jwt', { session: false }),
    function(req, res) {
      res.json('Success! You can now see this without a token.');
    },
  );

  app.post('/api/register', auth.optional, userController.registerUser);
  //app.post('/api/login', auth.optional, userController.loginUser);

  app.post('/api/login', logInMiddleware, userController.loginUser);


  app.get('/findUser', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        console.log('user found in db from route');
        res.status(200).send({
          auth: true,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          username: user.username,
          password: user.password,
          message: 'user found in db',
        });
      }
    })(req, res, next);
  });

};
