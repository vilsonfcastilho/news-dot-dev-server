import 'express-async-errors'
import 'reflect-metadata'

import { env } from '@/config/env'
import { globalExceptionHandler } from '@/shared/infra/middlewares/global-exception-handler'
import { router } from '@/shared/infra/routes/index'
import express from 'express'

const app = express()

app.use(express.json())
app.use(router)
app.use(globalExceptionHandler)

const port = env.PORT

app.listen(port, () => {
  console.log(`Server started on port ${port} 🚀`)
})
