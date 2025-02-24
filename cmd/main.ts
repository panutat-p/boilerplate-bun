import { Elysia } from 'elysia'
import { getFruits, health } from '../src/handler/handler'
import type { Config } from '../config/config'

const conf: Config = {
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
}

const e = new Elysia()

e.get('/', health)
e.get('/health', health)
e.get('/fruits', getFruits)

e.listen(conf.server.port)

console.info(`Listening on ${conf.server.port}`)
console.info(`http://localhost:${conf.server.port}`)
