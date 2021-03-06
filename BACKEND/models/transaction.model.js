/* eslint-disable */

module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define(
    'transaction',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_sender: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,
        validate: {
          notEmpty: {
            msg: 'The id_sender is required.',
          },
        },
      },
      id_recipient: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,
        validate: {
          notEmpty: {
            msg: 'The id_recipient is required.',
          },
        },
      },
      date_time: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'The date_time is required.',
          },
        },
      },
      amount_money: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        isNumeric: true,
        validate: {
          notEmpty: {
            msg: 'The amount_money is required.',
          },
        },
      },
      id_currency: {
        type: Sequelize.INTEGER,
        allowNull: true,
        isNumeric: true,
       /* validate: {
          notEmpty: {
            msg: 'The id_currency is required.',
          },
        },*/
      },
      transfer_title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'The transfer_title is required.',
          },
        },
      },
      authorization_key: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'key',
        validate: {
          notEmpty: {
            msg: 'The authorization_key is required.',
          },
        },
      },
      authorization_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notEmpty: {
            msg: 'The authorization_status is required.',
          },
        },
      },

    },
  );

  return Transaction;
};
