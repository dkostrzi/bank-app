const crypto = require('crypto');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: Sequelize.BIGINT,
      allowNull: true,
      isNumeric: true,
      /* validate: {
        notEmpty: {
          msg: 'The login is required.',
        },
      }, */
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'The password is required.',
        },
      },
    },
    hash: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
      /* validate: {
        notEmpty: {
          msg: 'The password is required.',
        },
      }, */
    },
    salt: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
      set() {
        this.setDataValue('salt', crypto.randomBytes(16).toString('hex'));
      },
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
      /* validate: {
         notEmpty: {
           msg: 'The name is required.',
         },
       }, */
    },
    surname: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
      /* validate: {
        notEmpty: {
          msg: 'The surname is required.',
        },
      }, */
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        isEmail: true,
        notEmpty: {
          msg: 'The email is required.',
        },
      },
    },
    date_registration: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    last_successful_logged: {
      type: Sequelize.DATE,
    },
    last_failed_logged: {
      type: Sequelize.DATE,
    },
    last_present_logged: {
      type: Sequelize.DATE,
    },
  });

  return User;
};
