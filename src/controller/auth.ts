import { Elysia, error, t } from 'elysia'

const authController = new Elysia()

  .post(
    '/register',
    ({ body }) => {
      return {
        message: 'Register successful',
      }
    },
    {
      body: t.Object({
        email: t.String({
          error: () => 'Invalid email',
        }),
        password: t.String({
          error: () => 'Invalid password',
        }),
      }),
    }
  )

  .post(
    '/login',
    ({ body }) => {
      return {
        message: 'Login successful',
      }
    },
    {
      body: t.Object({
        email: t.String({
          error: () => 'Invalid email',
        }),
        password: t.String({
          error: () => 'Invalid password',
        }),
      }),
    }
  )

export default authController
