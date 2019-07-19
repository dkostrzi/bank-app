/*eslint-disable */
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user.model');
const db = require('../config/db.config');
const helpers = require('../helpers/db.helper');
const { jwtOptions } = require('../config/jwt.config');
const bcrypt = require('bcrypt');

exports.getAllUsers = (req, res) => {
  helpers.getAllUsers().then(user => res.status(200).json(user));
};

exports.show = (req, res) => {
  const resposne = {
    res: true,
  };

  res.status(200).json(resposne);
};

/* exports.registerUser = (req, res, next) => {
  const {
    body: { user },
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }



  const finalUser = {
    password: new User().setPassword(user.password)
  }
  //finalUser.user(user.email, user.password);
 // finalUser.setPassword(user.password);

  db.users.create(finalUser).then(() => {
    res.json({ user: finalUser.toAuthJSON() });
  });
}; */

exports.registerUser = (req, res, next) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  helpers
    .createUser({ email, hash })
    .then(user => res.json({ user, msg: 'account created successfully' }));
};

exports.loginUser = async (req, res, next) => {
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
      const payload = { id: user.id, tes: 'dsdsds' };
      const token = jwt.sign(payload, jwtOptions.secretOrKey, {
        expiresIn: '60min',
      });
      res.json({ msg: 'ok', token });
    } else {
      // Passwords don't match
      res.status(401).json({ msg: 'Password is incorrect' });
    }
  }
};
