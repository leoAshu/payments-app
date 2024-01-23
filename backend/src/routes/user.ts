import { Router } from 'express'
import jwt from 'jsonwebtoken'
import zod from 'zod'
import { User } from '../db'
import { JWT_SECRET } from '../config'

const userRouter = Router()

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
})

userRouter.post('/signup', async (req, res) => {
  const success = signupSchema.safeParse(req.body)
  if (!success) {
    res.status(411).json({
      message: 'Invalid input',
    })
    return
  }

  const userExists = await User.findOne({
    username: req.body.username,
  })

  if (userExists) {
    res.status(411).json({
      message: 'Email already taken',
    })
    return
  }

  const user = await User.create(req.body)
  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  )

  res.status(200).json({
    message: 'User created succesfully',
    token,
  })
})

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
})
userRouter.post('/signin', async (req, res) => {
  const success = signinSchema.safeParse(req.body)
  if (!success) {
    res.status(411).json({
      message: 'Error while logging in',
    })
    return
  }

  const userExists = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  })

  if (!userExists) {
    res.status(411).json({
      message: 'Error while logging in',
    })
    return
  }

  const token = jwt.sign(
    {
      username: userExists.username,
    },
    JWT_SECRET
  )

  res.status(200).json({
    token,
  })
})

export default userRouter
