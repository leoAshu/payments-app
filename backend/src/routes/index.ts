import { Router } from 'express'

const rootRouter = Router()

rootRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is live!' })
})

export default rootRouter
