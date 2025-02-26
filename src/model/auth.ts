import { Elysia, error, t } from 'elysia'

export const authModel = new Elysia().model({
  'auth.logIn': t.Object({
    email: t.String({
      minLength: 1,
      format: 'email',
      error: (validation) => {
        const formatterErrors = validation.errors.map((error) => {
          switch (error.type) {
            case 50:
              return {
                field: error.path.replace('/', ''),
                message: 'Invalid Email format',
              }
            case 52:
              return {
                field: error.path.replace('/', ''),
                message: 'Email length must be at least 1 character',
              }
            default:
              return {
                field: error.path.replace('/', ''),
                message: 'Invalid Email format',
              }
          }
        })
        return formatterErrors
      },
    }),
    password: t.String({
      error: () => 'Invalid password',
    }),
  }),
  'auth.register': t.Object({
    email: t.String({
      minLength: 1,
      format: 'email',
      error: (validation) => {
        const formatterErrors = validation.errors.map((error) => {
          switch (error.type) {
            case 50:
              return {
                field: error.path.replace('/', ''),
                message: 'Invalid Email format',
              }
            case 52:
              return {
                field: error.path.replace('/', ''),
                message: 'Email length must be at least 1 character',
              }
            default:
              return {
                field: error.path.replace('/', ''),
                message: 'Invalid Email format',
              }
          }
        })
        return formatterErrors
      },
    }),
    password: t.String({
      error: () => 'Invalid password',
    }),
  }),
})
