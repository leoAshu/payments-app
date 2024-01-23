const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3000
const DB_URL = process.env.DB_URL || ''
const JWT_SECRET = process.env.JWT_SECRET || ''

module.exports = { PORT, DB_URL, JWT_SECRET }
