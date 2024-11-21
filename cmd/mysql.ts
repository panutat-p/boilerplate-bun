import { connectMySQL, insertFruit, listFruits, wrapMySQL } from '../src/mysql.ts'
import { fruit as fruitTable } from '../src/db/schema'

const conn = await connectMySQL({
  host: process.env.MYSQL_HOST ?? '',
  port: parseInt(process.env.MYSQL_PORT ?? ''),
  username: process.env.MYSQL_USERNAME ?? '',
  password: process.env.MYSQL_PASSWORD ?? '',
  database: process.env.MYSQL_DATABASE ?? '',
})

const db = wrapMySQL(conn)

const fruit: typeof fruitTable.$inferInsert = {
  name: 'apple',
  color: 'red',
  quantity: 4,
}

await insertFruit(db, fruit)

const rows = await listFruits(db)
console.info('👉 All fruits:', rows)

await conn.end()
console.info('👉 DB closed')
