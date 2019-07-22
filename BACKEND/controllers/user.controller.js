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


//TODO: check if user login or email exist
exports.register = (req, res, next) => {
  const { email, password, login } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  helpers
    .createUser({ email, hash, login })
    .then(user => {

      db.bills.create({
        id_owner: user.id,
        available_funds: 0,
        account_bill: getRandomInt(10000000000000000000000000, 99999999999999999999999999),
      }).then(bill => {
        res.json({ user, msg: 'account created successfully', bill });
      });
      return null;
    })

    .catch(function(err) {
      // handle error;
      res.status(400).json({ error: err.errors[0].message });
    });
};


exports.registerUser = (req, res) => {

  res.status(200).json(req.data);
};

exports.loginUser = (req, res) => {

  res.status(200).json(req.loginInfo);
};


/*exports.log = async (req, res, next) => {

  const { email, password } = req.body;

  if (email && password) {
    const user = await helpers.getUser({ email });

    if (!user) {
      res.status(401).json({ message: 'No such user found' });
    }
    if (bcrypt.compareSync(password, user.password)) {
      // Passwords match
      // from now on we'll identify the user by the id and the id is the
      // only personalized value that goes into our token

      user.update({ last_successful_logged: new Date() }).then(() => {
        console.log('succes update');
      });


      const payload = { id: user.id, email: user.email };
      const token = jwt.sign(payload, jwtOptions.secretOrKey, {
        expiresIn: '60min',
      });
      res.json({ msg: 'ok', token });
    } else {
      // Passwords don't match
      user.update({ last_failed_logged: new Date() }).then(() => {
        console.log('succes failed logged update');
      });
      res.status(401).json({ msg: 'Password is incorrect' });
    }
  }
};*/


