/*eslint-disable */

const jwt = require('jsonwebtoken');
const helpers = require('../helpers/db.helper');
const getRandomInt = require('../helpers/helpersfunction.helper').getRandomInt;
const { jwtOptions } = require('../config/jwt.config');
const bcrypt = require('bcrypt');
const db = require('../config/db.config');

exports.getAllUsers = (req, res) => {
  console.log('DECODED***********8', req.decoded);
  db.users.findAll({
    attributes: ['name', 'surname', 'id'],
  }).then(users => {
    res.status(200).json(users);
  })
    .catch(err => {
      res.status(400).json(err);
    });
//  helpers.getAllUsers().then(user => res.status(200).json(user));
};

exports.getTokenInfo = (req, res) => {
  res.json(req.decoded);
};

exports.registerUser = (req, res) => {

  res.status(200).json(req.data);
};

exports.loginUser = (req, res) => {

  res.status(200).json(req.loginInfo);
};

exports.getUserInfo = (req, res) => {
  const uId = req.decoded.id;

  db.users.findOne({
    where: {
      id: uId,
    },
  })
    .then(user => {
      db.bills.findOne({
        where: {
          id_owner: uId,
        },
      }).then(bill => {

        const result = {
          user: user,
          bill: bill,
        };

        res.status(200).json(result);
      });

    });


};

exports.updateUser = (req, res) => {
  const uId = req.decoded.id;
  db.users.findOne({
    where: {
      id: uId,
    },
  }).then(user => {
    user.update({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
    }).then(updated => {
      res.status(200).json({ success: true, message: 'user updated' });
    });

  }).catch(err => {
    res.status(404).json({ success: false, message: 'user not found' });
  });
};

