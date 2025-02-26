import { sql, SQL } from 'bun'

export function connectPostgresql(
  host: string,
  port: number,
  username: string,
  password: string,
  database: string
): SQL {
  const db = new SQL({
    hostname: host,
    port: port,
    username: username,
    password: password,
    database: database,
    tls: false,
  })

  return db
}

export async function listCustomers(db: SQL) {
  return await sql`
        SELECT * FROM customer
    `
}
