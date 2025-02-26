import { Elysia, error, t } from 'elysia'
import { authModel } from '../model/auth'

const authController = new Elysia()

  .use(authModel)

  .post(
    '/register',
    ({ body }) => {
      console.info(body.email)
      console.info(body.password)
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
    ({ body }) => {
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
