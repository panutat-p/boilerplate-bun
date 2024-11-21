import mysql, { type Connection } from 'mysql2/promise'
import { drizzle, type MySql2Database } from 'drizzle-orm/mysql2'
import type { Config } from './config.ts'

export async function connectMySQL(conf: Config): Promise<Connection> {
  const conn = await mysql.createConnection({
    host: conf.host,
    port: conf.port,
    user: conf.username,
    password: conf.password,
    database: conf.database,
  })
  console.info('👉 DB connected')
  return conn
}

export function wrapMySQL(conn: Connection): MySql2Database {
  return drizzle({ client: conn })
}
