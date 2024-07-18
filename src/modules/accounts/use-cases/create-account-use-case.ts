import { AppError } from "@/shared/errors/app-error"
import { PrismaService } from '@/shared/infra/prisma/prisma-service'
import { hash } from 'bcryptjs'

interface IRequest {
  email: string
  password: string
}

export class CreateAccountUseCase {
  constructor(private prisma: PrismaService) {}

  async handle({ email, password }: IRequest): Promise<void> {
    if (!email || email === '') throw new AppError("The property 'email' is required.")
    if (!password || password === '') throw new AppError("The property 'password' is required.")

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (userWithSameEmail) throw new AppError('User with same e-mail already exists.')

    const hashedPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    })
  }
}
