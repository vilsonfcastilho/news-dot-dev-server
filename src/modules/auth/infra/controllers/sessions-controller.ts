import { LoginUseCase } from '@/modules/auth/use-cases/login-use-case'
import { prismaService } from '@/shared/infra/prisma/prisma-service'
import { NextFunction, Request, Response } from 'express'

class SessionsController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { email, password } = req.body

    const Login = new LoginUseCase(prismaService)
    const data = await Login.handle({
      email,
      password,
    })

    return res.status(201).json({
      status: 'success',
      message: 'Session created successfully!',
      data,
    })
  }
}

export const sessionsController = new SessionsController()
