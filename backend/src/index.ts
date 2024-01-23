import Express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = Express()

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`)
})
