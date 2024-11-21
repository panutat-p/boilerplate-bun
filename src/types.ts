import { fruit as fruitTable } from './db/schema'

export type FruitInsert = typeof fruitTable.$inferInsert
