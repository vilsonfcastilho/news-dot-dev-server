import { PrismaClient } from '@prisma/client'

export class PrismaService extends PrismaClient
{
  constructor() {
    super({
      log: ['warn', 'error'],
    })
  }

  onModuleInit() {
    return this.$connect()
  }

  onModuleDestroy() {
    return this.$disconnect()
  }
}

export const prismaService = new PrismaService()
