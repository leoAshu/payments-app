const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { PORT } = require('./config')
const v1Router = require('./routes')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/v1', v1Router)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
