/*eslint-disable */

const User = require('../config/db.config').users;

exports.createUser = ({ email, hash }) =>
  User.create({ email, password: hash, date_registration: new Date() });
exports.getAllUsers = async () => await User.findAll();
exports.getUser = async obj =>
  await User.findOne({
    where: obj,
  });
