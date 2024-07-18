import { AppError } from '@/shared/errors/app-error'
import { NextFunction, Request, Response } from 'express'

export const globalExceptionHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  if (err instanceof AppError) {
    return res.status(err.statusCode ?? 400).json({
      status: 'error',
      message: err.message,
    })
  }

  console.log('Unhandled Error: ', err)

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  })
}
