module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: Sequelize.BIGINT,
      allowNull: false,
      isNumeric: true,
      validate: {
        notEmpty: {
          msg: 'The login is required.',
        },
      },
    },
  });

  return User;
};
