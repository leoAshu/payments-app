import Express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db'

dotenv.config()
const app = Express()

app.listen(process.env.PORT, () => {
  connectDB()
  console.log(`Server is running on port: ${process.env.PORT}`)
})
