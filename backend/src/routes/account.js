const express = require('express')
const { authMiddleWare } = require('../middlewares')
const { Account } = require('../db')

const accountRouter = express.Router()

accountRouter.get('/balance', authMiddleWare, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  })

  res.status(200).json({
    balance: account.balance,
  })
})

module.exports = accountRouter
