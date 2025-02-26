import { Elysia, t } from 'elysia'
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

  .get(
    '/customers/:id',
    ({ params: { id }, error }) => {
      const customer = customers.find((customer) => customer.id === id)

      if (!customer) {
        return error(404, {
          error: 'Customer not found',
        })
      }

      return customer
    },
    {
      params: t.Object({
        id: t.Number({
          error: () => `Invalid param 'id'`,
        }),
      }),
    }
  )

  .post(
    '/customers',
    ({ body, set, error }) => {
      const req = body as Customer

      customers.push({
        id: customers.length + 1,
        name: req.name,
        email: req.email,
      })

      set.status = 201
      return {
        message: 'Customer created',
      }
    },
    {
      body: t.Object({
        name: t.String({
          error: () => `Invalid body, 'name'`,
        }),
        email: t.String({
          error: () => `Invalid body, 'email'`,
        }),
      }),
    }
  )

  .patch(
    '/customers/:id',
    ({ params: { id }, body, error }) => {
      const req = body as Customer

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
    },
    {
      params: t.Object({
        id: t.Number({
          error: () => `Invalid param 'id'`,
        }),
      }),
      body: t.Object({
        name: t.String({
          error: () => `Invalid body, 'name'`,
        }),
        email: t.String({
          error: () => `Invalid body, 'email'`,
        }),
      }),
    }
  )

  .delete(
    '/customers/:id',
    ({ params: { id }, error }) => {
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
    },
    {
      params: t.Object({
        id: t.Number({
          error: () => `Invalid param 'id'`,
        }),
      }),
    }
  )

export default customerController
