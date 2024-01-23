const express = require('express')
const zod = require('zod')
const mongoose = require('mongoose')

const { authMiddleWare } = require('../middlewares')
const { Account } = require('../db')

const accountRouter = express.Router()

accountRouter.get('/balance', authMiddleWare, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  })

  if (!account) {
    res.status(404).json({
      message: 'Account not found',
      userId: req.userId,
    })
  }

  res.status(200).json({
    balance: account.balance,
  })
})

accountRouter.post('/transfer', authMiddleWare, async (req, res) => {
  const sender = await Account.findOne({
    userId: req.userId,
  })

  if (!sender || sender.balance < req.body.amount) {
    res.json(400).json({
      message: 'Insufficient balance',
    })
    return
  }

  const receiver = await Account.findOne({
    userId: req.body.to,
  })

  if (!receiver) {
    res.status(400).json({
      message: 'Invalid account',
    })
    return
  }

  await Account.updateOne({ userId: req.userId }, { $inc: { balance: -req.body.amount } })
  await Account.updateOne({ userId: req.body.to }, { $inc: { balance: req.body.amount } })

  res.status(200).json({
    message: 'Transfer successful',
  })
})

module.exports = accountRouter
