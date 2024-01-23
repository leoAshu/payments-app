import mongoose from 'mongoose'
import { DB_URL } from './config'

if (DB_URL) {
  mongoose.connect(DB_URL)
} else {
  console.log('DB URL does not exist')
}

interface User {
  username: string
  firstName: string
  lastName: string
  password: string
}

const UserSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
})

const User = mongoose.model('User', UserSchema)

export { User }
