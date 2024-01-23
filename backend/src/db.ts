import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connectDB = async () => {
  // if (process.env.DB_URL) {
  //   await mongoose.connect(process.env.DB_URL)
  //   console.log('DB connected')
  // } else {
  //   console.log('DB url not defined')
  // }
}

export { connectDB }
