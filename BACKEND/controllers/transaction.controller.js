/* eslint-disable */
const Op = require('sequelize').Op;
const db = require('../config/db.config');
const nodemailer = require('nodemailer');
const User = db.users;
const Bill = db.bills;
const env = require('../config/env.config');


exports.registerTransaction = (req, res) => {


  const senderId = req.decoded.id;

  const { recipientId, amountMoney, transferTitle, email } = req.body;

  console.info('EMAIL:', email);

  db.bills.findOne({
    where: {
      id_owner: senderId,
    },
  }).then(sender => {

    updateSenderMoney(amountMoney, sender.available_funds, senderId, false)
      .then(() => {
        db.bills.findOne({
          where: {
            id_owner: recipientId,
          },
        }).then(recipient => {
          updateRecipientMoney(amountMoney, recipient.available_funds, recipientId, false)
            .then(() => {

              db.transactions.create({
                id_sender: senderId,
                id_recipient: recipientId,
                date_time: new Date(),
                amount_money: amountMoney,
                authorization_key: generateKey(),
                transfer_title: transferTitle,
              })
                .then(trans => {
                  sendAuthKey(trans.authorization_key, email).then(() => {
                    console.log('MAIL SENDED');
                    res.status(200).json({ success: true, authorization_key: trans.authorization_key, id: trans.id });

                  })
                    .catch(err => {
                      console.log('MAIL ERRROR: ', err);
                    });
                });

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

//TODO: handle errors
exports.confirmTransaction = (req, res) => {
  const { transactionId, authKey } = req.body;
  db.transactions.findOne({
    where: {
      id: transactionId,
    },
  }).then(finded => {
   // console.log('FINDED!!!-----', finded);
    if (finded.authorization_key == authKey) {
      const { id_sender, id_recipient, amount_money } = finded;
      db.bills.findOne({
        where: {
          id_owner: id_sender,
        },
      }).then(sender => {
        updateSenderMoney(amount_money, sender.available_funds, id_sender, true)
          .then(() => {
            db.bills.findOne({
              where: {
                id_owner: id_recipient,
              },
            })
              .then(recipient => {
               // console.log('!!!!!!!!!!RECIEPIENT:!!! ', recipient);
                updateRecipientMoney(amount_money, recipient.available_funds, id_recipient, true)
                  .then(() => {
                    console.log("TRANSACTION ID:---- ",transactionId)
                    db.transactions.update(
                      { authorization_status: 1 },
                      { where: { id: transactionId } },

                    ).then(() => {
                      res.status(200).json({ success: true });
                    })
                      .catch(err=>{
                        console.log(err);
                      });
                  })
                  .catch(err=>{
                    console.log(err);
                  });
              });
          });

      });

    } else {
      res.status(404).json({ success: false, message: 'AUTH KEY NOT WORKING' });
    }
  });

};

exports.getAllUserTransactions = (req, res) => {
  const uId = req.decoded.id;
  db.transactions.findAll({
    where: {
      authorization_status: true,
      [Op.or]: [{ id_sender: uId }, { id_recipient: uId }],
    },
    include: [
      {
        model: User,
        as: 'getSenderdata',
        where: { id: db.Sequelize.col('transaction.id_sender') },
        attributes: ['name', 'surname'],
        include: [
          {
            model: Bill,
            attributes: ['account_bill'],
          },
        ],
      },
      {
        model: User,
        as: 'getRecipientdata',
        where: { id: db.Sequelize.col('transaction.id_sender') },
        attributes: ['name', 'surname'],
        include: [
          {
            model: Bill,
            attributes: ['account_bill'],
          },
        ],
      },
    ],
  })
    .then(transactions => {
      res.status(200).json(transactions);
    })
    .catch(err => {
      res.status(401).json({ success: false, error: err });
    });
};


async function updateSenderMoney(money, senderAvailableFunds, senderId, isConfirm) {

  //Checking if sender has funds
  const diff = (parseFloat(senderAvailableFunds) - parseFloat(money));

  if (diff < 0) {
    throw new Error('Sender dosen\'t have enough funds');

  } else {
    if (isConfirm) {
      db.bills.update(
        { available_funds: (parseFloat(senderAvailableFunds) - parseFloat(money)).toFixed(2) },
        { where: { id_owner: senderId } },
      );
    }

  }
}

async function updateRecipientMoney(money, recipientAvailableFunds, recipientId, isConfirm) {
  if (isConfirm) {
    db.bills.update(
      { available_funds: (parseFloat(recipientAvailableFunds) + parseFloat(money)).toFixed(2) },
      { where: { id_owner: recipientId } },
    );
  }

}

//TODO:generate transaction key
function generateKey() {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const avaialbleSigns = 'ABCDEFGHIJKLMNOPRSTUWQZX0123456789abcdeufgijklmnoprstuqwz';

  let key = '';
  for (i = 0; i < 26; i++) {
    key += avaialbleSigns[getRandomInt(0, avaialbleSigns.length - 1)];
  }

  console.log(key);


  return key;
}


async function sendAuthKey(key, email) {

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'dkostrzewa.pl',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: env.nodemailer.username, // generated ethereal user
      pass: env.nodemailer.password, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Bank Application" <bank@dkostrzewa.pl', // sender address
    to: `${email}`, // list of receivers
    subject: 'Your safety key', // Subject line
    // plain text body
    html: `<b>Hello ${email}</b><br/> This is Your authorization key: ${key}`, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
