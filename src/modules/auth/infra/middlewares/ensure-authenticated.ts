import { auth } from '@/config/auth'
import { AppError } from '@/shared/errors/app-error'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization

  if (!authHeader) throw new AppError('JWT token is missing.', 401)

  const [, token] = authHeader.split(' ')

  try {
    const { secret } = auth.jwt

    const decoded = verify(token, secret)

    const { sub } = decoded as ITokenPayload

    req.user = {
      id: sub,
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT token.', 401)
  }
}
