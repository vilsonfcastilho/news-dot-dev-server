import { accountsController } from '@/modules/accounts/infra/controllers/accounts-controller'
import { Router } from 'express'

export const accountsRouter = Router()

accountsRouter.post('/', accountsController.create)
