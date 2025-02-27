import { Elysia, error, t } from 'elysia'
import { authModel } from '../model/auth'
import { logIn, register } from '../service/auth'
import { randomFullNameEn } from '../lib/faker'
const authController = new Elysia()

  .use(authModel)

  .post(
    '/register',
    async ({ body }) => {
      console.info(body.email)
      console.info(body.password)

      const result = await register(randomFullNameEn(), body.email, body.password)

      if (result.error) {
        return error(400, {
          error: result.error,
        })
      }

      return {
        message: 'Register successful',
      }
    },
    {
      body: 'auth.register',
    }
    // {
    //   body: t.Object({
    //     email: t.String({
    //       error: () => 'Invalid email',
    //     }),
    //     password: t.String({
    //       error: () => 'Invalid password',
    //     }),
    //   }),
    // }
  )

  .post(
    '/login',
    async ({ body }) => {
      const result = await logIn(body.email, body.password)

      if (result.error) {
        return error(400, {
          error: result.error,
        })
      }

      return {
        message: 'Login successful',
      }
    },
    {
      body: 'auth.logIn',
    }
    // {
    //   body: t.Object({
    //     email: t.String({
    //       error: () => 'Invalid email',
    //     }),
    //     password: t.String({
    //       error: () => 'Invalid password',
    //     }),
    //   }),
    // }
  )

export default authController
