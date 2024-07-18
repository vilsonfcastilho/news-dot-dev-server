import { auth } from '@/config/auth'
import { AppError } from '@/shared/errors/app-error'
import { PrismaService } from '@/shared/infra/prisma/prisma-service'
import { compare } from 'bcryptjs'
import { sign } from "jsonwebtoken"

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  access_token: string
}

export class LoginUseCase {
  constructor(private prisma: PrismaService) {}

  async handle({ email, password }: IRequest): Promise<IResponse> {
    if (!email || email === '') throw new AppError("The property 'email' is required.")
    if (!password || password === '') throw new AppError("The property 'password' is required.")

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) throw new AppError('User credentials does not match.', 403)

    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) throw new AppError('User credentials does not match.', 403)

    const { secret, expiresIn } = auth.jwt

    const accessToken = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return { access_token: accessToken }
  }
}
