const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config')

const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      message: 'Unauthorized',
    })
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    if (decoded.userId) {
      req.userId = decoded.userId
      next()
    }
  } catch (err) {
    res.status(401).json({
      message: 'Unauthorized',
    })
    return
  }
}

module.exports = { authMiddleWare }
