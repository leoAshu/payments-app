import Express from 'express'
import dotenv from 'dotenv'
import v1Router from './routes'
import cors from 'cors'
import bodyParser from 'body-parser'

dotenv.config()

const app = Express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/v1', v1Router)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`)
})
