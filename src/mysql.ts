import mysql, { type Connection } from 'mysql2/promise'
import { drizzle, type MySql2Database } from 'drizzle-orm/mysql2'
import type { Config } from './config.ts'

export async function connectMySQL(conf: Config): Promise<{ connection: Connection; db: MySql2Database }> {
  const conn = await mysql.createConnection({
    host: conf.host,
    port: conf.port,
    user: conf.username,
    password: conf.password,
    database: conf.database,
  })
  console.info('👉 DB connected')
  const db = drizzle({ client: conn })
  return { connection: conn, db }
}

export async function closeMySQL(connection: Connection): Promise<void> {
  await connection.end()
  console.info('👉 DB closed')
}
