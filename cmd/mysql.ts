import mysql from 'mysql2/promise'
import { drizzle } from 'drizzle-orm/mysql2'

const conn = await mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'poc',
})
console.info('👉 DB connected')

const db = drizzle({ client: conn })

const res = await db.execute(`SELECT * FROM fruit`)
console.info(res[0])

await conn.end()
console.info('👉 DB closed')
process.exit(0)
