import mysql from 'mysql2/promise'
import { drizzle } from 'drizzle-orm/mysql2'
import { fruit as fruitTable } from '../src/db/schema.ts'

const conn = await mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'demo',
})
console.info('👉 DB connected')

const db = drizzle({ client: conn })

const exec = await db
  .insert(fruitTable)
  .values([
    { name: 'banana', color: 'yellow', quantity: 3 },
    { name: 'cherry', color: 'red', quantity: 7 },
  ])
  .$returningId()

console.info('👉 Inserted a fruit, result:', exec)

const rows = await db.select().from(fruitTable)
console.info('👉 rows:', rows)

await conn.end()
console.info('👉 DB closed')
