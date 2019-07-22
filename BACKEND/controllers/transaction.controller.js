/* eslint-disable */

const db = require('../config/db.config');

exports.registerTransaction = (req, res) => {

  async function updateSenderMoney(money, senderAvailableFunds, senderId) {

    //Checking if sender has funds
    const diff = (parseFloat(senderAvailableFunds) - parseFloat(money));

    if (diff < 0) {
      throw new Error("Sender dosen't have enough funds");

    } else {
      db.bills.update(
        { available_funds: (parseFloat(senderAvailableFunds) - parseFloat(money)).toFixed(2) },
        { where: { id_owner: senderId } },
      );
    }
  }

  async function updateRecipientMoney(money, recipientAvailableFunds, recipientId) {
    db.bills.update(
      { available_funds: (parseFloat(recipientAvailableFunds) + parseFloat(amountMoney)).toFixed(2) },
      { where: { id_owner: recipientId } },
    );
  }

  //TODO:generate transaction key
  function generateKey() {
    const key = 'transaction_key';

    return key;
  }


  const senderId = req.decoded.id;

  const { recipientId, amountMoney, transferTitle } = req.body;

  db.bills.findOne({
    where: {
      id_owner: senderId,
    },
  }).then(sender => {

    updateSenderMoney(amountMoney, sender.available_funds, senderId)
      .then(() => {
        db.bills.findOne({
          where: {
            id_owner: recipientId,
          },
        }).then(recipient => {
          updateRecipientMoney(amountMoney, recipient.available_funds, recipientId)
            .then(() => {
              db.transactions.create({
                id_sender: senderId,
                id_recipient: recipientId,
                date_time: new Date(),
                amount_money: amountMoney,
                authorization_key:generateKey(),
                transfer_title: transferTitle,
              });
              res.status(200).json({ success: true });
            });
        });
      })
      .catch(err => {
        //TODO: fix status code
        res.status(401).json({ success: false, message: err.toString() });
      });


  }).catch(err => {

    res.status(401).json({ success: false, error: err });
  });

};
