import { Router } from 'express'
import userRouter from './user'

const v1Router = Router()

v1Router.use('/user', userRouter)

v1Router.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is live!' })
})

export default v1Router
