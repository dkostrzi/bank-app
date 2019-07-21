const env = {
  database: 'bankapp',
  username: 'root',
  password: '',
  host: 'localhost',
  dialect: 'mysql',
  api_url: 'http://localhost:3000/api',
  pool: {
    max: 15,
    min: 5,
    idle: 20000,
    evict: 15000,
    acquire: 30000,
  },
  SECRET_KEY: 'pawelhozer',
  nodemailer: {
    username: 'mail-address@gmail.com',
    password: 'mail-password',
  },
  adminAccount: {
    login: 1234,
    password: '1234',
    name: 'Bank',
    surname: 'Application',
    email: 'mail-address@gmail.com',
    account_bill: 82143247368915159214987653,
    available_funds: 0,
    account_balance_history: '0,0',
    incoming_transfers_sum: 0,
    outgoing_transfers_sum: 0,
  },
};

module.exports = env;
