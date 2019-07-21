const billController = require('../controllers/bill.controller');
const { checkToken } = require('../middlewares/checkToken.middleware');

module.exports = app => {
  app.get('/api/bill', checkToken, billController.getLoggedUserBill);
};
