/*eslint-disable */

const jwt = require('jsonwebtoken');
const helpers = require('../helpers/db.helper');
const getRandomInt = require('../helpers/helpersfunction.helper');
const { jwtOptions } = require('../config/jwt.config');
const bcrypt = require('bcrypt');
const db = require('../config/db.config');

exports.getAllUsers = (req, res) => {
  console.log('DECODED***********8', req.decoded);
  helpers.getAllUsers().then(user => res.status(200).json(user));
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


