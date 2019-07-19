const db = require('../config/db.config');

exports.getAllUsers = (req, res) => {
  db.users.findAll().then(users => res.status(200).json(users));
};

exports.show = (req, res) => {
  const resposne = {
    res: true,
  };

  res.status(200).json(resposne);
};
