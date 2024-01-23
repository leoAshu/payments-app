import Express from 'express'
import v1Router from './routes'
import cors from 'cors'
import bodyParser from 'body-parser'
import { PORT } from './config'

const app = Express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/v1', v1Router)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
