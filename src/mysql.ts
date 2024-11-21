import mysql, { type Connection } from 'mysql2/promise'
import { drizzle, type MySql2Database } from 'drizzle-orm/mysql2'
import { fruit as fruitTable } from './db/schema'
import type { Config } from './config.ts'
import type { FruitInsert } from './types.ts'

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

export async function insertFruit(db: MySql2Database, fruit: FruitInsert): Promise<void> {
  await db.insert(fruitTable).values(fruit)
  console.info('👉 Inserted a fruit:', fruit)
}

export async function listFruits(db: MySql2Database): Promise<FruitInsert[]> {
  const rows = await db.select().from(fruitTable)
  console.info('👉 All fruits:', rows)
  return rows
}
