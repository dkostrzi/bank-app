const userController = require('../controllers/user.controller');

module.exports = app => {
  app.get('/api/users', userController.getAllUsers);
  app.get('/api/test', userController.show);
};
