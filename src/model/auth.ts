import { Elysia, t } from 'elysia'

export const authModel = new Elysia().model({
  'auth.logIn': t.Object({
    email: t.String({
      error: () => 'Invalid email',
    }),
    password: t.String({
      error: () => 'Invalid password',
    }),
  }),
  'auth.register': t.Object({
    email: t.String({
      error: () => 'Invalid email',
    }),
    password: t.String({
      error: () => 'Invalid password',
    }),
  }),
})
