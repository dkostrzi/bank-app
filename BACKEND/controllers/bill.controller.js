const db = require('../config/db.config');

exports.getLoggedUserBill = (req, res) => {
  const uId = req.decoded.id; // getting logged userId from token payload
  db.bills
    .findOne({
      where: {
        id_owner: uId,
      },
    })
    .then(bill => {
      res.status(200).json(bill);
    })
    .catch(err => {
      // TODO: set proper http status
      res.status(404).json({ error: err });
    });
};
