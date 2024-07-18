import { CreateAccountUseCase } from '@/modules/accounts/use-cases/create-account-use-case'
import { prismaService } from '@/shared/infra/prisma/prisma-service'
import { NextFunction, Request, Response } from 'express'

class AccountsController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { email, password } = req.body

    const CreateAccount = new CreateAccountUseCase(prismaService)
    const data = await CreateAccount.handle({
      email,
      password,
    })

    return res.status(201).json({
      status: 'success',
      message: 'Account created successfully!',
      data,
    })
  }
}

export const accountsController = new AccountsController()
