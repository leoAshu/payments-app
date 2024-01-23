const mongoose = require('mongoose')

const { DB_URL } = require('../config')
const Account = require('./models/account')
const User = require('./models/user')

mongoose
  .connect(DB_URL)
  .then(() => console.log('DB connection successful'))
  .catch((reason) => console.log(`DB connection failed: ${reason}`))

module.exports = {
  Account,
  User,
}
