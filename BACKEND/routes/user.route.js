/* eslint-disable */

const passport = require('passport');
const userController = require('../controllers/user.controller');
const { checkToken } = require('../middlewares/checkToken.middleware');
const auth = require('./auth');
const jwt = require('jsonwebtoken');
const User = require('../config/db.config').users;
const logInMiddleware = require('../middlewares/logInRegister.middleware').logInMiddleware;
const registerMiddleware = require('../middlewares/logInRegister.middleware').registerMiddleware;
import { getAllUsers, getTokenInfo, getUserInfo } from '../controllers/user.controller';
import UserController from '../controllers/user.controller';

module.exports = app => {

  app.get('/api/test', (req, res, next) => res.status(200).send('test'))

  app.get('/api/users', checkToken, UserController.getAllUsers);

  app.get('/api/token', checkToken, UserController.getTokenInfo);

  app.get('/api/user', checkToken, UserController.getUserInfo);

  //app.post('/api/register', auth.optional, userController.registerUser);
  app.post('/api/register', registerMiddleware, UserController.registerUser);
  //app.post('/api/login', auth.optional, userController.loginUser);

  app.post('/api/login', logInMiddleware, UserController.loginUser);

  app.put('/api/user', checkToken, UserController.updateUser);


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
