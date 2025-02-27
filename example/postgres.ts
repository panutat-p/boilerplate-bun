import { SQL } from 'bun'

export class CustomerStore {
  private db: SQL

  constructor(db: SQL) {
    this.db = db
  }

  async insertNewCustomer(row: any) {
    return await this.db`
      INSERT INTO customer
      (name, email)
      VALUES
      (${row.name}, ${row.email})
      RETURNING *
    `
  }

  async listCustomers() {
    return await this.db`
      SELECT *
      FROM customer
      ORDER BY id DESC
    `
  }

  async getCustomerById(id: number) {
    return await this.db`
      SELECT *
      FROM customer
      WHERE id = ${id}
      LIMIT 1
    `
  }

  async updateCustomer(id: number, row: any) {
    return await this.db`
      UPDATE customer
      SET name = ${row.name}, email = ${row.email}
      WHERE id = ${id}
      RETURNING *
    `
  }

  async deleteCustomer(id: number) {
    return await this.db`
      DELETE FROM customer WHERE id = ${id}
    `
  }
}
