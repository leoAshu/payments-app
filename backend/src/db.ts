import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

if (process.env.DB_URL) {
  mongoose.connect(process.env.DB_URL)
} else {
  console.log('DB URL does not exist')
}

interface User {
  username: string
  fistName: string
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
  fistName: {
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
