const express = require('express')

const userRouter = require('./user')
const accountRouter = require('./account')

const v1Router = express.Router()

v1Router.use('/user', userRouter)
v1Router.use('/account', accountRouter)

module.exports = v1Router
