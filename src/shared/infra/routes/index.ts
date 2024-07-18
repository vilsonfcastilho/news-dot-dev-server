import { accountsRouter } from '@/modules/accounts/infra/routes/accounts-router'
import { sessionsRouter } from '@/modules/auth/infra/routes/sessions-router'
import { Router } from 'express'

export const router = Router()

router.use('/accounts', accountsRouter)

router.use('/sessions', sessionsRouter)
