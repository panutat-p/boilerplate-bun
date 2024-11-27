import { connectMySQL, insertFruits, listFruits, updateFruitColor, wrapMySQL } from '../src/mysql.ts'

const conn = await connectMySQL({
  host: process.env.MYSQL_HOST ?? '',
  port: parseInt(process.env.MYSQL_PORT ?? ''),
  username: process.env.MYSQL_USERNAME ?? '',
  password: process.env.MYSQL_PASSWORD ?? '',
  database: process.env.MYSQL_DATABASE ?? '',
})

const db = wrapMySQL(conn)

await insertFruits(db, [
  { name: 'banana', color: 'yellow', quantity: 3 },
  { name: 'cherry', color: 'red', quantity: 7 },
])

await updateFruitColor(db, 1, 'green')

const rows = await listFruits(db)
console.info('👉 All fruits:', rows)

await conn.end()
console.info('👉 DB closed')
