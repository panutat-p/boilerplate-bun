import { Elysia } from 'elysia'
import { randomFullNameEn, randomEmail } from '../faker'

const customers = [
  {
    id: 1,
    name: randomFullNameEn(),
    email: randomEmail(),
  },
  {
    id: 2,
    name: randomFullNameEn(),
    email: randomEmail(),
  },
  {
    id: 3,
    name: randomFullNameEn(),
    email: randomEmail(),
  },
  {
    id: 4,
    name: randomFullNameEn(),
    email: randomEmail(),
  },
]

const customerController = new Elysia()

  .get('/customers', () => {
    return customers
  })

  .get('/customers/:id', ({ params, error }) => {
    const id = parseInt(params.id)
    const customer = customers.find((customer) => customer.id === id)

    if (!customer) {
      return error(404, {
        error: 'Customer not found',
      })
    }

    return customer
  })

export default customerController
