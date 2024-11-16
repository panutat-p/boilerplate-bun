import mysql from 'mysql2/promise'
import { drizzle } from 'drizzle-orm/mysql2'
import { fruit as fruitTable } from '../src/db/schema'

const conn = await mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'demo',
})
console.info('👉 DB connected')

const db = drizzle({ client: conn })

const fruit: typeof fruitTable.$inferInsert = {
  name: 'apple',
  color: 'red',
  quantity: 4,
}

await db.insert(fruitTable).values(fruit)
console.info('👉 Inserted a fruit:', fruit)

const rows = await db.select().from(fruitTable)
console.info('👉 All fruits:', rows)

await conn.end()
console.info('👉 DB closed')
