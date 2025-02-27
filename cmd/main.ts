import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { health } from '../src/handler/handler'
import cors from '@elysiajs/cors'
import staticPlugin from '@elysiajs/static'
import { logger } from '@bogeychan/elysia-logger'
import { jwt } from '@elysiajs/jwt'
import { ConfigSchema, type Config } from '../config/config'
import authController from '../src/controller/auth'
import customerController from '../src/controller/customer'
import uploadController from '../src/controller/upload'

const conf = ConfigSchema.parse({
  server: {
    port: parseInt(Bun.env.PORT!),
  },
  jwt: {
    secret: Bun.env.JWT_SECRET!,
  },
  postgres: {
    host: Bun.env.POSTGRES_HOST!,
    port: parseInt(Bun.env.POSTGRES_PORT!),
    username: Bun.env.POSTGRES_USERNAME!,
    password: Bun.env.POSTGRES_PASSWORD!,
    database: Bun.env.POSTGRES_DATABASE!,
  },
  mysql: {
    host: Bun.env.MYSQL_HOST!,
    port: parseInt(Bun.env.MYSQL_PORT!),
    username: Bun.env.MYSQL_USERNAME!,
    password: Bun.env.MYSQL_PASSWORD!,
    database: Bun.env.MYSQL_DATABASE!,
  },
  redis: {
    host: Bun.env.REDIS_HOST!,
    port: parseInt(Bun.env.REDIS_PORT!),
    username: Bun.env.REDIS_USERNAME!,
    password: Bun.env.REDIS_PASSWORD!,
    database: Bun.env.REDIS_DATABASE!,
  },
}) satisfies Config

new Elysia({ prefix: '/api' })
  .onError(({ code, error, set }) => {
    // catch throw error from controller
    switch (code) {
      case 'NOT_FOUND':
        set.status = 404
        return {
          error: 'Not Found',
        }
      case 'VALIDATION':
        set.status = 400
        return {
          error: error.message,
        }
      default:
        set.status = 500
        return {
          error: error,
        }
    }
  })
  .use(cors())
  .use(
    logger({
      level: 'debug',
      autoLogging: true,
    })
  )
  .use(
    staticPlugin({
      assets: 'public',
    })
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Bun API',
          version: '1.0.0',
        },
      },
    })
  )
  .use(
    jwt({
      name: 'jwt',
      secret: conf.jwt.secret,
    })
  )
  .get('/', health)
  .get('/health', health)
  .get('/ip', ({ server, request }) => {
    return server?.requestIP(request)
  })
  .use(authController)
  .use(customerController)
  .use(uploadController)
  .listen(conf.server.port)

console.info(`Listening on ${conf.server.port}`)
console.info(`http://localhost:${conf.server.port}/api/swagger`)
