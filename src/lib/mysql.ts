import mysql, { type Connection } from 'mysql2/promise'
import { drizzle, type MySql2Database } from 'drizzle-orm/mysql2'
import { fruit as fruitTable } from '../db/schema.ts'
import { eq } from 'drizzle-orm/sql/expressions/conditions'
import type { Config } from '../../config/config.ts'
import type { FruitInsert } from './types.ts'

export async function connectMySQL(conf: Config): Promise<Connection> {
  const conn = await mysql.createConnection({
    host: conf.mysql.host,
    port: conf.mysql.port,
    user: conf.mysql.username,
    password: conf.mysql.password,
    database: conf.mysql.database,
  })
  console.info('👉 DB connected')
  return conn
}

export function wrapMySQL(conn: Connection): MySql2Database {
  return drizzle({ client: conn })
}

/**
 * Inserts a single fruit into the database.
 * $returningId() does not work as expected.
 */
export async function insertFruit(db: MySql2Database, fruit: FruitInsert): Promise<void> {
  const result = await db.insert(fruitTable).values(fruit).$returningId()
  console.info('👉 Inserted a fruit, result:', result)
}

/**
 * Inserts multiple fruits into the database.
 * $returningId() does not work as expected.
 */
export async function insertFruits(db: MySql2Database, fruits: FruitInsert[]): Promise<void> {
  const result = await db.insert(fruitTable).values(fruits).$returningId()
  console.info('👉 Inserted fruits, result:', result)
}

export async function listFruits(db: MySql2Database): Promise<FruitInsert[]> {
  return db.select().from(fruitTable)
}

export async function updateFruitColor(
  db: MySql2Database,
  id: number,
  color: string
): Promise<void> {
  await db.update(fruitTable).set({ color: color }).where(eq(fruitTable.id, id))
}
