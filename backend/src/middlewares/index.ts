import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from '../config'

interface AuthRequest extends Request {
  userId?: string
}

const authMiddleWare = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(403).json({})
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload

    if (decoded.userId) {
      req.userId = decoded.userId
      next()
    }
  } catch (err) {
    res.status(403).json({})
    return
  }
}
