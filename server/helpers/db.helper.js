/*eslint-disable */

const User = require('../config/db.config').users;

exports.createUser = ({ email, hash, login }) =>
  User.create({ email, password: hash, date_registration: new Date(), login });

exports.getAllUsers = () => User.findAll();

exports.getUser = obj =>
  User.findOne({
    where: obj,
  });

