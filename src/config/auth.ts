import { env } from '@/config/env'

export const auth = {
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: '1d',
  },
}
