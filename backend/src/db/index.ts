import mongoose from 'mongoose'
import { DB_URL } from '../config'
import User from './models/user'
import Account from './models/account'

if (DB_URL) {
  mongoose.connect(DB_URL)
} else {
  console.log('DB URL does not exist')
}

export { User, Account }
