const transactionController = require('../controllers/transaction.controller');
const { checkToken } = require('../middlewares/checkToken.middleware');

module.exports = app => {
  app.post(
    '/api/transaction/register',
    checkToken,
    transactionController.registerTransaction,
  );

  app.get('/api/transaction',checkToken,transactionController.getAllUserTransactions)
};
