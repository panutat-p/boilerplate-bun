import { Elysia } from 'elysia'
import { randomFullNameEn, randomEmail } from '../lib/faker'

type Customer = {
  id: number
  name: string
  email: string
}

const customers: Customer[] = [
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
    if (isNaN(id)) {
      return error(400, { error: 'Invalid ID format' })
    }

    const customer = customers.find((customer) => customer.id === id)

    if (!customer) {
      return error(404, {
        error: 'Customer not found',
      })
    }

    return customer
  })

  .post('/customers', ({ body, set, error }) => {
    const req = body as Customer

    if (!req.name || typeof req.name !== 'string') {
      return error(400, { error: 'Name is required and must be a string' })
    }
    if (!req.email || typeof req.email !== 'string') {
      return error(400, { error: 'Email is required and must be a string' })
    }

    customers.push({
      id: customers.length + 1,
      name: req.name,
      email: req.email,
    })

    set.status = 201
    return {
      message: 'Customer created',
    }
  })

  .patch('/customers/:id', ({ params, body, error }) => {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return error(400, { error: 'Invalid ID format' })
    }

    const req = body as Customer
    if (!req.name || typeof req.name !== 'string') {
      return error(400, { error: 'Name is required and must be a string' })
    }
    if (!req.email || typeof req.email !== 'string') {
      return error(400, { error: 'Email is required and must be a string' })
    }

    const customer = customers.find((customer) => customer.id === id)

    if (!customer) {
      return error(404, {
        error: 'Customer not found',
      })
    }

    customer.name = req.name
    customer.email = req.email

    return {
      message: 'Customer updated',
    }
  })

  .delete('/customers/:id', ({ params, error }) => {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return error(400, { error: 'Invalid ID format' })
    }

    const index = customers.findIndex((customer) => customer.id === id)

    if (index === -1) {
      return error(404, {
        error: 'Customer not found',
      })
    }

    customers.splice(index, 1)

    return {
      message: 'Customer deleted',
    }
  })

export default customerController
