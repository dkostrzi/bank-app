/* eslint-disable */

const passport = require('passport');
const userController = require('../controllers/user.controller');
const { checkToken } = require('../middlewares/checkToken.middleware');
const auth = require('./auth');

module.exports = app => {
  app.get('/api/users', checkToken, userController.getAllUsers);

  app.get(
    '/api/protected',
    passport.authenticate('jwt', { session: false }),
    function(req, res) {
      res.json('Success! You can now see this without a token.');
    },
  );

  app.post('/api/register', auth.optional, userController.registerUser);
  app.post('/api/login', auth.optional, userController.loginUser);
};
