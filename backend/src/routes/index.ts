import { Router } from 'express'

const mainRouter = Router()

mainRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is live!' })
})

export default mainRouter
