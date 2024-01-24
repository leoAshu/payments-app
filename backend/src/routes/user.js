const express = require('express')
const zod = require('zod')
const jwt = require('jsonwebtoken')

const { Account, User } = require('../db')
const { JWT_SECRET } = require('../config')
const { authMiddleWare } = require('../middlewares')

const userRouter = express.Router()

userRouter.get('/', authMiddleWare, async (req, res) => {
  const user = await User.findById(req.userId)

  res.status(200).json({
    userId: user._id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  })
})

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
})

userRouter.post('/signup', async (req, res) => {
  const success = signupBody.safeParse(req.body)

  if (!success) {
    res.status(400).json({
      message: 'Invalid inputs',
    })
    return
  }

  const userExists = await User.findOne({
    username: req.body.username,
  })

  if (userExists) {
    res.status(400).json({
      message: 'Email already taken',
    })
    return
  }

  const newUser = await User.create(req.body)

  await Account.create({
    userId: newUser._id,
    balance: 1 + Math.random() * 100000,
  })

  const token = jwt.sign(
    {
      userId: newUser._id,
    },
    JWT_SECRET
  )

  res.status(200).json({
    message: 'User created succesfully',
    token,
  })
})

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
})

userRouter.post('/signin', async (req, res) => {
  const success = signinBody.safeParse(req.body)

  if (!success) {
    res.status(400).json({
      message: 'Error while logging in',
    })
    return
  }

  const userExists = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  })

  if (!userExists) {
    res.status(400).json({
      message: 'Error while logging in',
    })
    return
  }

  const token = jwt.sign(
    {
      userId: userExists._id,
    },
    JWT_SECRET
  )

  res.status(200).json({
    token,
  })
})

const updateBody = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
})
userRouter.put('/', authMiddleWare, async (req, res) => {
  const success = updateBody.safeParse(req.body)

  if (!success) {
    res.status(400).json({
      message: 'Error while updating information',
    })
    return
  }

  await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  )

  res.status(200).json({
    message: 'Updated succesfully',
  })
})

userRouter.get('/bulk', authMiddleWare, async (req, res) => {
  const filter = req.query.filter || ''

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  })

  res.status(200).json({
    users: users.map((user) => ({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    })),
  })
})

module.exports = userRouter
