import { mysqlTable, primaryKey, int, varchar, timestamp } from 'drizzle-orm/mysql-core'
import { sql } from 'drizzle-orm'

export const fruit = mysqlTable(
  'fruit',
  {
    id: int().autoincrement().notNull(),
    name: varchar({ length: 100 }).notNull(),
    color: varchar({ length: 100 }).notNull(),
    quantity: int(),
    updatedAt: timestamp('updated_at', { fsp: 6, mode: 'string' })
      .default(sql`(CURRENT_TIMESTAMP(6))`)
      .onUpdateNow(),
    createdAt: timestamp('created_at', { fsp: 6, mode: 'string' }).default(
      sql`(CURRENT_TIMESTAMP(6))`
    ),
  },
  (table) => {
    return {
      fruitId: primaryKey({ columns: [table.id], name: 'fruit_id' }),
    }
  }
)
