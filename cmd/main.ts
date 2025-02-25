import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { health } from '../src/handler/handler'
import { ConfigSchema, type Config } from '../config/config'
import customerController from '../src/controller/customer'
const conf = ConfigSchema.parse({
  server: {
    port: parseInt(Bun.env.PORT!),
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
    if (code === 'NOT_FOUND') {
      set.status = 404
      return {
        error: 'Not Found',
      }
    }
  })
  .use(swagger())
  .get('/', health)
  .get('/health', health)
  .get('/ip', ({ server, request }) => {
    return server?.requestIP(request)
  })
  .use(customerController)
  .listen(conf.server.port)

console.info(`Listening on ${conf.server.port}`)
console.info(`http://localhost:${conf.server.port}/api/swagger`)
