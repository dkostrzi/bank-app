const transactionController = require('../controllers/transaction.controller');
const { checkToken } = require('../middlewares/checkToken.middleware');

module.exports = app => {
  app.post(
    '/api/transaction/register',
    checkToken,
    transactionController.registerTransaction,
  );
  app.post(
    '/api/transaction/confirm',
    checkToken,
    transactionController.confirmTransaction,
  );

  app.get('/api/transaction',checkToken,transactionController.getAllUserTransactions)
};
