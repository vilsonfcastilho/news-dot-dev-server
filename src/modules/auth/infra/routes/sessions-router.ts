import { sessionsController } from '@/modules/auth/infra/controllers/sessions-controller'
import { Router } from 'express'

export const sessionsRouter = Router()

sessionsRouter.post('/', sessionsController.create)
