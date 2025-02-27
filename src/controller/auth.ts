import { Elysia, error } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { authModel } from '../model/auth'
import { logIn, register, getUserById } from '../service/auth'
import { randomFullNameEn } from '../lib/faker'
const authController = new Elysia()

  .use(
    jwt({
      name: 'jwt',
      secret: Bun.env.JWT_SECRET!,
      exp: '2h',
    })
  )

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
    async ({ body, error, jwt }) => {
      const result = await logIn(body.email, body.password)

      if (result.error) {
        return error(400, {
          error: result.error,
        })
      }

      const token = await jwt.sign({
        id: result.id!,
        iss: 'Bun API',
      })

      return {
        message: 'Login successful',
        token: token,
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

  .get('/profile', async ({ error, jwt, headers: { authorization } }) => {
    const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : undefined

    if (!token) {
      return error(401, {
        error: 'Unauthorized',
      })
    }

    const payload = await jwt.verify(token)
    if (!payload) {
      return error(401, {
        error: 'Unauthorized',
      })
    }

    const user = await getUserById(Number(payload.id))
    if (!user) {
      return error(500, {
        error: 'User not found',
      })
    }

    return {
      user,
    }
  })

export default authController
