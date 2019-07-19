const Sequelize = require('sequelize');
const env = require('./env.config.js');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/user.model')(sequelize, Sequelize);

db.start = () => {
  //  console.log("USER ID",us.getId());
  sequelize.sync({ force: true }).then(() => {
    db.users.create({
      login: env.adminAccount.login,
      password: env.adminAccount.password,
      name: env.adminAccount.name,
      surname: env.adminAccount.surname,
      email: env.adminAccount.email,
      date_registration: new Date(),
    });
  });
};

module.exports = db;
